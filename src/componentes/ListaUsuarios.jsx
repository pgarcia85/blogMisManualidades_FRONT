
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
        //esto es para que se recargue la pagina despues de eliminar el usuario  <FontAwesomeIcon icon={faTrashAlt} />
       this.state.usuarios.map((usuario, index) => {         
        if(usuario.idusuario===idUsuario){  
            //eliminar el post de la lista la funcion splice nos devuelve el post eliminado     
           this.state.usuarios.splice(index,1);   
           //asignar la lista en el estate para que se actualice el componente
           this.setState({usuarios: this.state.usuarios});
        }
    });  
   // this.setState({usuarios: this.authService.getAllUsuarios()});
}
    




     
/**
 * Método que establece si se debe mostrar o no el botón para borrar post
 * 
 * @param {*} usuario 
 * @param {*} rolAdmistrador 
 * @param {*} idPost 
 * @returns 
 */
    mostrarIconoBorrarUsuario(usuarioConectado, rolAdmistrador, usu){
        let boton;
        if(usuarioConectado!=null && usuarioConectado.roles.includes(rolAdmistrador)){
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
        const rol_administrador = "ROLE_ADMINISTRADOR";
        return (


            <Table striped hover responsive className="mt-5">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.usuarios.map((usu) => {
                            return (
                                <tr>
                                    <td>
                                        <BrowserRouter>
                                         {this.mostrarIconoBorrarUsuario(usuarioConectado, rol_administrador, usu)}
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