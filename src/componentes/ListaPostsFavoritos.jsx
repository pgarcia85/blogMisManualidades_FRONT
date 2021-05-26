
import React from 'react';
import PostService from '../service/PostService';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as corazonSolido, faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons';


export default class ListaPostFavorito extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            //id del usuario logado
            id: this.props.match.params.id,
            posts: []};
        
        this.postService = new PostService();
        this.detallePost = this.detallePost.bind(this);
    }

    detallePost(id, imagen) {
        this.props.history.push(`/detallePost/${id}`);
    }

    eliminarFavorito(idPost, idUsuario){
        //elimina el post como favorito
        this.postService.eliminarPostFavorito(idUsuario,idPost);
        this.state.posts.map((postFav, index) => {         
            if(postFav.idpost===idPost){
                // eliminar el post favorito de la lista
                this.state.posts.splice(index,1);
                //asignar la nueva lisa en el state
               this.setState({posts: this.state.posts});
            }
        });
    }

    componentDidMount() {     
        this.postService.getAllFavoritos(this.state.id)
        .then(data => 
            this.setState({ posts: data }));
        
        }

    render() {  
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        return (
           
            <div className="d-flex flex-column">
                {this.state.posts.length>0 ?(
                    this.state.posts.map((post) => {
                        return (
                            <section className="col-md-12 d-flex align-items-center border m-1 p-1" key={post.idpost}>
                                <aside className="col-md-6">
                                    <Image src={require('../recursos/imagenes/' + post.imagen)} thumbnail />
                                </aside>
                                
                                <article className="col-md-6 d-flex flex-column align-items-center" >
                                <FontAwesomeIcon icon={corazonSolido} className="ml-auto align-self-start m-5" size="lg"
                                onClick={() =>this.eliminarFavorito(post.idpost, usuario.id)}/>
                                        <h3>{post.titulo}</h3>
                                       
                                        <p>{post.resumen}</p>
                                        <BrowserRouter>
                                        <OverlayTrigger
                                            key={'left'}
                                            placement={'left'}
                                            overlay={
                                            <Tooltip id={'tooltip-left'}>
                                                Ver detalle post
                                            </Tooltip>
                                            }>
                                            <FontAwesomeIcon icon={faAngleDoubleRight} size="lg" className="color" onClick={() =>this.detallePost(post.idpost, post.imagen)} />
                                        </OverlayTrigger> 
                                        </BrowserRouter>
                                       
                                   
                                </article>
                            </section>
                        )
                    })
                ):(
                    <div className="d-flex justify-content-center mt-3 col-md-12">
                       <div className="alert alert-warning col-md-8 text-center">Aún no tienes post favoritos</div>
                    </div>
                )
                }
                
            </div>
        )
    }
}