import React from 'react';
import DatosPersonalesService from '../service/DatosPersonalesService';
import { Form, Button } from 'react-bootstrap';

export default class DatosPersonales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            nombre:"",
            apellidos:"",
            direccion:"",
            email:"",
            telefono:"",
            mensaje: "",
            exito: false
        };
        this.datosPersonalesService = new DatosPersonalesService();
        this.handleModificarDatos = this.handleModificarDatos.bind(this);
        this.onChangeNombre = this.onChangeNombre.bind(this);
        this.onChangeApellidos = this.onChangeApellidos.bind(this);
        this.onChangeDireccion = this.onChangeDireccion.bind(this);
        this.onChangeTelefono = this.onChangeTelefono.bind(this);
    }

    componentDidMount() {
        this.datosPersonalesService.getDatosPersonales(this.state.id)
            .then(data =>
                this.setState({
                    nombre: data.nombre,
                    apellidos:data.apellidos,
                    direccion:data.direccion,
                    email:data.email,
                    telefono:data.telefono
                 }))
    }

    onChangeNombre(e) {
        const nuevoNombre = e.target.value;
        this.setState({
            nombre: nuevoNombre
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


    handleModificarDatos(e) {
        e.preventDefault();
        this.setState({
            mensaje: ""
        });

        this.datosPersonalesService.updateDatosPersonales(this.state.id, this.state.nombre, this.state.apellidos, 
            this.state.direccion, this.state.telefono)
            .then(
                response => {
                    this.setState({
                        mensaje: response.data.mensaje,
                        exito:true
                    })
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
                             <button type="button" class="close" data-dismiss="alert">&times;</button>
                            {this.state.mensaje}
                        </div>
                    </div>
                )}
                    <Form onSubmit={this.handleModificarDatos}>
                        <Form.Group controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text"
                                value={this.state.nombre}
                                onChange={this.onChangeNombre} />
                        </Form.Group>
                        <Form.Group controlId="apellidos">
                            <Form.Label>Apellidos</Form.Label>
                            <Form.Control type="text"
                                value={this.state.apellidos}
                                onChange={this.onChangeApellidos} />
                        </Form.Group>
                        <Form.Group controlId="direccion">
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text"
                                value={this.state.direccion} 
                                onChange={this.onChangeDireccion}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" readOnly
                                value={this.state.email} />
                        </Form.Group>
                        <Form.Group controlId="telefono">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control type="text"
                                value={this.state.telefono} 
                                onChange={this.onChangeTelefono} />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{
                            'float': 'right'
                        }}>
                            Modificar
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}