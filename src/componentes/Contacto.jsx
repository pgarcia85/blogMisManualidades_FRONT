import React from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Post extends React.Component {


    render() {
        return (
            <div className="container col-md-12 d-flex justify-content-center">
            <div className="col-md-8 mt-5">
            <Form>
                <Form.Group controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Intruzca su nombre" 
                    required/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Intruzca su email"
                    required />
                </Form.Group>
                <Form.Group controlId="asunto">
                    <Form.Label>Asunto</Form.Label>
                    <Form.Control type="text" placeholder="Intruzca el motivo de la consulta" 
                    required/>
                </Form.Group>
                <Form.Group controlId="mensaje">
                    <Form.Label>Deja un comentario</Form.Label>
                    <Form.Control as="textarea" rows={4} placeholder="Intruzca el mensaje" 
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