
import React from 'react';
import AuthService from '../service/AuthService';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt} from '@fortawesome/free-solid-svg-icons';




export default class ListaUsuarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = { usuarios: [],
                     };

        this.authService = new AuthService();
        this.eliminarUsuario = this.eliminarUsuario.bind(this);
        this.mostrarIconoBorrarUsuario= this.mostrarIconoBorrarUsuario.bind(this);
    }


   
    eliminarUsuario(idUsuario) {
        this.authService.eliminarUsuario(idUsuario)
        //esto es para que se recargue la pagina despues de eliminar el usuario
       this.state.usuarios.map((usuario, index) => {         
        if(usuario.idusuario===idUsuario){  
            //eliminar el post de la lista la funcion splice nos devuelve el post eliminado     
           this.state.usuarios.splice(index,1);   
           //asignar la lista en el estate para que se actualice el componente
           this.setState({usuarios: this.state.usuarios});
        }
    });  
}
    




     
/**
 * Método que establece si se debe mostrar o no el botón para borrar post
 * 
 * @param {*} usuarioConectado es el usuario conectado en la aplicacion
 * @param {*} usu es el usuario que viene de base de datos
 * @returns 
 */
    mostrarIconoBorrarUsuario(usuarioConectado, usu){
        let boton;
        if(usuarioConectado!=null && usu.apellidos!="Administrador"){
            boton = <span id ="iconoBorrarUsuario"  title="Borrar Usuario" onClick={() => this.eliminarUsuario(usu.idusuario)} className="m-1">
                                        <OverlayTrigger
                                            key={'left'}
                                            placement={'left'}
                                            overlay={
                                            <Tooltip id={'tooltip-left'}>
                                                Borrar Usuario
                                            </Tooltip>
                                            }>
                                           <FontAwesomeIcon icon={faTrashAlt} />
                                        </OverlayTrigger>                    
                    </span>
        }
        return  boton;
    }

   


    componentDidMount() {
        this.authService.getAllUsuarios()
        .then(data => 
            this.setState({ usuarios: data }));
        }
    

    render() {
        const usuarioConectado = JSON.parse(localStorage.getItem("usuario"));
        return (


            <Table striped hover responsive table-condensed="true" className="mt-5 col-12">
                <thead>
                    <tr>
                        <th className="col-1"></th>
                        <th className="col-3">Nombre</th>
                        <th className="col-3">Apellidos</th>
                        <th className="col-1">Email</th>
                        <th className="col-1">Teléfono</th>
                        <th className="col-3">Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.usuarios.map((usu) => {
                            return (
                                <tr key={usu.email}>
                                    <td>
                                        <BrowserRouter>
                                         {this.mostrarIconoBorrarUsuario(usuarioConectado, usu)}
                                        </BrowserRouter>
                                    </td>
                                    <td>{usu.nombre}</td>
                                    <td>{usu.apellidos}</td>
                                    <td>{usu.email}</td>
                                    <td>{usu.telefono}</td>
                                    <td>{usu.direccion}</td>
                                </tr>

                            )
                        })
                    }
                </tbody>

            </Table>
        )

    }
}