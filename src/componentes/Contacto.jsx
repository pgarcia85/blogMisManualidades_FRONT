import React from 'react';
import { Form, Button } from 'react-bootstrap';
import ContactoService from "../service/ContactoService";

export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            email: "",
            asunto:"",
            texto:"",
            //parametros para el mensaje que se muestra en pantalla
            mensaje: "",
            exito: false
        };  

        this.contactoService = new ContactoService();
        this.handleBorrarForm = this.handleBorrarForm.bind(this);
        this.handleContacto = this.handleContacto.bind(this);
        this.onChangeNombre=this.onChangeNombre.bind(this);
        this.onChangeEmail=this.onChangeEmail.bind(this);
        this.onChangeAsunto=this.onChangeAsunto.bind(this);
        this.onChangeTexto=this.onChangeTexto.bind(this);
    }

    handleBorrarForm(){
        this.setState({
            nombre: "",
            email: "",
            asunto:"",
            texto:"",
            mensaje: ""
        });
    }

    handleContacto(e){
        e.preventDefault();
        this.setState({
            mensaje: ""
        });
        this.contactoService.enviarEmail(this.state.nombre, this.state.email, this.state.asunto, this.state.texto)
        .then(response =>{
            this.setState({
                mensaje: response.data.mensaje,
                exito: true
            })
        },
        error => {
            const resMessage = (error.response && error.response.data &&
                error.response.data.mensaje) || error.message || error.toString();

            this.setState({
                mensaje: resMessage
            });
        }
        )
    //borrar los campos del formulario
    this.handleBorrarForm();
    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeAsunto(e) {
        this.setState({
            asunto: e.target.value
        });
    }
    onChangeTexto(e) {
        this.setState({
            texto: e.target.value
        });
    }

    render() {
        return (
            <div className="container col-md-12 d-flex justify-content-center">
            <div className="col-md-8 mt-5">

            {this.state.mensaje && (
                    <div className="form-group">
                        <div className={
                            this.state.exito
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert">
                            {this.state.mensaje}
                        </div>
                    </div>
                )}

            <Form onSubmit={this.handleContacto}>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Intruzca su nombre" 
                    value={this.state.nombre}
                    onChange={this.onChangeNombre}
                    required/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Intruzca su email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    required />
                </Form.Group>
                <Form.Group controlId="asunto">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" placeholder="Intruzca el motivo de la consulta" 
                    value={this.state.asunto}
                    onChange={this.onChangeAsunto}
                    required/>
                </Form.Group>
                <Form.Group controlId="mensaje">
                    <Form.Label>Deja un comentario</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Intruzca el mensaje" 
                    value={this.state.texto}
                    onChange={this.onChangeTexto}
                    required/>
                </Form.Group>
                <Button variant="dark" type="submit" style={{
                   'float':'right'
                }}>
                    Enviar
                </Button>
            </Form>
            </div>
            </div>
        )
    }

}