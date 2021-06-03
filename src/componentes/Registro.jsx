import React from 'react';
import { Form, Button } from 'react-bootstrap';

import AuthService from "../service/AuthService";


export default class Registro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: "",
            apellidos: "",
            direccion: "",
            telefono: "",
            emmail: "",
            contrasenia: "",
            //parametros para el mensaje que se muestra en pantalla
            mensaje: "",
            exito: false
        };
        this.authService = new AuthService();
        this.handleRegistro = this.handleRegistro.bind(this);
        this.handleBorrarForm = this.handleBorrarForm.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeApellidos = this.onChangeApellidos.bind(this);
        this.onChangeDireccion = this.onChangeDireccion.bind(this);
        this.onChangeTelefono = this.onChangeTelefono.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeContrasenia = this.onChangeContrasenia.bind(this);
    }

    onChangeNombre(e) {
        this.setState({
            nombre: e.target.value
        });
    }

    onChangeApellidos(e) {
        this.setState({
            apellidos: e.target.value
        });
    }

    onChangeDireccion(e) {
        this.setState({
            direccion: e.target.value
        });
    }
    onChangeTelefono(e) {
        this.setState({
            telefono: e.target.value
        });
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangeContrasenia(e) {
        this.setState({
            contrasenia: e.target.value
        });
    }

    handleBorrarForm(){
        this.setState({
            nombre: "",
            apellidos: "",
            direccion: "",
            telefono: "",
            email: "",
            contrasenia: ""
        });
    }

    handleRegistro(e) {
        e.preventDefault();
        this.setState({
            mensaje: ""
        });

        this.authService.registrar(this.state.nombre, this.state.apellidos, this.state.direccion,
            this.state.telefono, this.state.email, this.state.contrasenia)
            .then(
                response => {
                    this.setState({
                        mensaje: response.data.mensaje,
                        exito:true
                    })
                  //borrar los campos del formulario
                    this.handleBorrarForm();
                },
                error => {
                    const resMessage = (error.response && error.response.data &&
                        error.response.data.mensaje) || error.message || error.toString();

                    this.setState({
                        mensaje: resMessage
                    });
                }
            );
            
    }


    render() {
        return (
            <div className="d-flex flex-column align-items-center">
                <div className="col-md-8 mt-5">
                {this.state.mensaje && (
                    <div className="form-group text-center">
                        <div className={
                            this.state.exito
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                             </button>
                            {this.state.mensaje}
                        </div>
                    </div>
                )}

                    <Form onSubmit={this.handleRegistro}>
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                placeholder="Intruzca su nombre"
                                value={this.state.nombre}
                                onChange={this.onChangeNombre}
                                required 
                                maxLength="45"/>
                        </Form.Group>
                        <Form.Group controlId="apellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text"
                                placeholder="Intruzca sus apellidos"
                                value={this.state.apellidos}
                                onChange={this.onChangeApellidos}
                                required 
                                maxLength="100"/>
                        </Form.Group>
                        <Form.Group controlId="direccion">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text"
                                placeholder="Intruzca su direccion"
                                value={this.state.direccion}
                                onChange={this.onChangeDireccion}
                                required 
                                maxLength="100"/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                placeholder="Intruzca su email"
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                required
                                maxLength="45"/>
                        </Form.Group>
                        <Form.Group controlId="telefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="number" placeholder="Intruzca su número de teléfono"
                                value={this.state.telefono}
                                onChange={this.onChangeTelefono}
                                required 
                                maxLength="9"/>
                        </Form.Group>
                        <Form.Group controlId="contraseña">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" placeholder="Intruzca su contraseña"
                                value={this.state.contrasenia}
                                onChange={this.onChangeContrasenia}
                                required
                                maxLength="10"/>
                        </Form.Group>
                        <Button variant="dark" type="submit" style={{
                            'float': 'right'
                        }}>
                            Enviar
                </Button>

                
                    </Form>
                </div>
            </div>
        )
    }

}