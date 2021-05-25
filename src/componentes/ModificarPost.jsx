import React from 'react';
import { Form, Button } from 'react-bootstrap';
import PostService from '../service/PostService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class modificarPost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            titulo:"",
            resumen: "",
            texto:""
        };
        this.postService = new PostService();
        this.onChangeTitulo=this.onChangeTitulo.bind(this);
        this.onChangeResumen=this.onChangeResumen.bind(this);
        this.onChangeTexto=this.onChangeTexto.bind(this);
        this.handleModificarPost=this.handleModificarPost.bind(this);
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

    onChangeTexto(data) {
        this.setState({
            texto: data
        });
    }
  
    componentDidMount() {
        this.postService.getPost(this.state.id)
            .then(data =>
                this.setState({ 
                    titulo: data.titulo,
                    resumen: data.resumen,
                    texto: data.texto }))
    }

    handleModificarPost(e) {
        e.preventDefault();
        this.setState({
            mensaje: ""
        });

        this.postService.modificarPost(this.state.id, this.state.titulo, this.state.resumen, 
            this.state.texto)
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
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                             </button>
                            {this.state.mensaje}
                        </div>
                    </div>
                )}
                    <Form onSubmit={this.handleModificarPost}>
                        <Form.Group controlId="titulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control type="text"
                                value={this.state.titulo}
                                onChange={this.onChangeTitulo}
                               />
                        </Form.Group>
                        <Form.Group controlId="resumen">
                            <Form.Label>Resumen</Form.Label>
                            <Form.Control type="text" as="textarea" rows={4}
                                value={this.state.resumen}
                                onChange={this.onChangeResumen}
                                 />
                        </Form.Group>
                        <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.texto}
                    
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.onChangeTexto(data);
                        } }
                            />
                      
                     
                        <Button variant="dark" type="submit" style={{
                            'float': 'right'
                        }} className="mt-2">
                            Guardar
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }

}