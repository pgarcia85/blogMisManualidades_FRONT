
import React from 'react';
import PostService from '../service/PostService';
import { Image } from 'react-bootstrap';
import Comentarios from './Comentarios';

export default class DetallePost extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            post: {}
        };
        this.postService = new PostService();
    }

   


    componentDidMount() {
        this.postService.getPost(this.state.id)
            .then(data =>
                this.setState({ post: data }))
    }



    render() {
        var post = this.state.post;
        let contenido;
        if (post.imagen != null) {
            contenido = 
                <div className="d-flex flex-column align-items-center mt-4 ">
                     <div className="d-flex flex-column align-items-center border pt-4 col-12">
                            <h1>{post.titulo}</h1>
                            <p className="col-auto">~ {post.fechaCreacion} ~</p>
                            <h3 className="mt-2">{post.resumen}</h3>
                            <div dangerouslySetInnerHTML={{__html: post.texto}} className="mt-4"/>
                            <Image src={require('../recursos/imagenes/' + post.imagen)} thumbnail className="m-3 col-md-6" />
                </div>

                <Comentarios className="m-5" idpost={post.idpost} />

                </div>
           

        }
        return (
            <div>

                {contenido}

                
            </div>
        )
    }
}