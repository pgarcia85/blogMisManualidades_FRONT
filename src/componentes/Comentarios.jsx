import React from 'react';
import ComentarioService from '../service/ComentarioService';
import { Form, Button, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'




export default class Comentarios extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comentarios: []
        };
        this.comentarioService = new ComentarioService();

    }

    save() {
        this.comentarioService.saveComentario(this.state.comentario)
        .then(data =>{
            this.state.comentarios.push(data);
            this.setState({comentarios: this.state.comentarios});
            });
   
     
    }

    eliminar(idComentario) {
        this.comentarioService.deleteComentario(idComentario);
        //esto es para que se recargue la pagina despues de guardar un comentario
        this.state.comentarios.map((comen, index) => {         
            if(comen.idComentario===idComentario){
               this.setState({comen: this.state.comentarios.splice(index,1)});
            }
        });
    }

    mostrarIconoBorrar(usuario, rolAdmistrador, idComentario){
        let boton;
        if(usuario!=null && usuario.roles.includes(rolAdmistrador)){
            boton = <div className="col-md-1" id ="iconoBorrar"  title="Borrar comentario" onClick={() => this.eliminar(idComentario)}>
                       
                       <OverlayTrigger
                            key={'left'}
                            placement={'left'}
                            overlay={
                                <Tooltip id={'tooltip-left'}>
                                     Borrar comentario
                                </Tooltip>
                                 }>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </OverlayTrigger>
                        
                    </div>
        }else{
            boton = <div className="col-md-1"></div>
        }
        return  boton;
    }

    

    componentDidMount() {
        this.comentarioService.getComentariosPost(this.props.idpost)
            .then(data => this.setState({
                 comentarios: data 
                }))
    }

    

    render() {
         //obtener el usuario, para saber quien inserta el comentario
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        let formulario;
        const rol_registrado = "ROLE_REGISTRADO";
        const rol_administrador= "ROLE_ADMINISTRADOR"; 
     
        if(usuario!=null &&  (usuario.roles.includes(rol_registrado) || usuario.roles.includes(rol_administrador) )){
                formulario= 
                    
                            <Form className="col-md-12 d-flex flex-column mt-5">
                                <Form.Label><h5><strong>Deja un comentario:</strong></h5></Form.Label>
                                <Form.Control className="col-md-12" as="textarea" rows={3} onChange={(e) => {
                                    let val = e.target.value;               
                                    this.setState(prevState => {
                                        let comentario = Object.assign({}, prevState.comentario)
                                        comentario.texto = val;
                                        comentario.idPost = this.props.idpost;
                                        comentario.idUsuario = usuario.id;
                                        return { comentario };
                                        })
                                    }} />
                                <Button className="m-2 ml-auto" variant="dark" onClick={() => this.save()}>Enviar</Button>
                            </Form>
                    
        }
        return (
            <div className="d-flex flex-column align-items-center mt-5 col-md-8 ">
                <h6>Comentarios ({this.state.comentarios.length})</h6>
                {
                    this.state.comentarios.map((comentario) => {
                        return (
                            <div key={comentario.idComentario}  className="d-flex flex-column col-md-12 p-1">
                                
                                <div className="col-md-12">{comentario.texto}</div>
                                <div className="d-flex">
                                    {this.mostrarIconoBorrar(usuario,rol_administrador, comentario.idComentario)}
                                    <div className="col-md-2">{comentario.fechaCreacion}</div>
                                    <div className="col-md-2"><strong>{comentario.nombreUsuario}</strong></div>
                                </div>
                               
                            
                            </div>
                        )
                    })
                 
                }
                {formulario}
               
            </div>
        )
    }
}