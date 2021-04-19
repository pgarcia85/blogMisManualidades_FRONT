import React from 'react';
import PostService from '../service/PostService';
import { Form, Button } from 'react-bootstrap';


export default class NuevoPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: "",
            resumen: "",
            texto: "",
            exito: false
        };
        this.postService = new PostService();
        this.handleGuardarPost = this.handleGuardarPost.bind(this);
        this.handleBorrarForm = this.handleBorrarForm.bind(this);
        this.onChangeTitulo = this.onChangeTitulo.bind(this);
        this.onChangeResumen = this.onChangeResumen.bind(this);
        this.onChangeTexto = this.onChangeTexto.bind(this);
    }

    onChangeTitulo(e) {
        this.setState({
            titulo: e.target.value
        });
    }

    onChangeResumen(e) {
        this.setState({
            resumen: e.target.value
        });
    }

    onChangeTexto(e) {
        this.setState({
            texto: e.target.value
        });
    }

    handleBorrarForm(){
        this.setState({
            titulo: "",
            resumen: "",
            texto: "",
        });
    }

    handleGuardarPost(e) {
        e.preventDefault();
        this.setState({
            mensaje: ""
        });

       this.postService.guardaPost(this.state.titulo, this.state.resumen, this.state.texto)
            .then(
                response => {
                    this.setState({
                        mensaje: response.data.mensaje,
                        exito:true
                    })
                   // window.location.reload(); hacer una funcion para vaciar los campos
                },
                error => {
                    const resMessage = (error.response && error.response.data &&
                        error.response.data.mensaje) || error.message || error.toString();

                    this.setState({
                        mensaje: resMessage
                    });
                }
       );
       this.handleBorrarForm();
    }

    render() {
        return (
            <div className="d-flex justify-content-center ">
                <div className="col-md-8  mt-5 ">
                {this.state.mensaje && (
                    <div className="form-group text-center">
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

                    <Form onSubmit={this.handleGuardarPost} className="d-flex flex-column">
                        <Form.Group controlId="titulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text"
                                placeholder="Titulo Post"
                                value={this.state.titulo}
                                onChange={this.onChangeTitulo}
                                required />
                        </Form.Group>
                        <Form.Group controlId="resumen">
                            <Form.Label>Resumen</Form.Label>
                            <Form.Control as="textarea" rows={4}
                                placeholder="Resumen Post"
                                value={this.state.resumen}
                                onChange={this.onChangeResumen}
                                required/>
                        </Form.Group>
                        <Form.Group controlId="texto">
                            <Form.Label>Texto</Form.Label>
                            <Form.Control as="textarea" rows={8}
                                placeholder="Texto del post"
                                value={this.state.texto}
                                onChange={this.onChangeTexto}
                                required />
                        </Form.Group>
                        <Button variant="dark" type="submit" className="ml-auto">
                            Guardar
                        </Button>

                
                    </Form>
                </div>
            </div>
        )
    }
}