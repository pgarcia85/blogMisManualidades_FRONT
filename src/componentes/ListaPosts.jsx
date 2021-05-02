
import React from 'react';
import PostService from '../service/PostService';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrashAlt, faHeart as corazonSolido, faAngleDoubleRight, faEdit} from '@fortawesome/free-solid-svg-icons';
import { faHeart as corazonHueco } from '@fortawesome/free-regular-svg-icons';



export default class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = { posts: [],
                       postsFavoritos: [],
                     };

        this.postService = new PostService();
        this.detallePost = this.detallePost.bind(this);
        this.eliminarPost = this.eliminarPost.bind(this);
        this.mostrarIconoBorrarPost = this.mostrarIconoBorrarPost.bind(this);
        this.postFavorito=this.postFavorito.bind(this);
        this.esFavorito=this.esFavorito.bind(this);
        this.mostrarIconoFavorito=this.mostrarIconoFavorito.bind(this);
        this.getPost=this.getPost.bind(this);
        this.mostrarIconoModificarPost=this.mostrarIconoModificarPost.bind(this);
        this.modificarPost=this.modificarPost.bind(this);
    }

    detallePost(id, imagen) {
        this.props.history.push(`/detallePost/${id}`);
    }

    modificarPost(id){
        this.props.history.push(`/modificarPost/${id}`);
    }

    /**
     * 
     * @param {*} idPost 
     */
    eliminarPost(idPost) {
        this.postService.eliminarPost(idPost);
        //esto es para que se recargue la pagina despues de eliminar el post  <FontAwesomeIcon icon={faTrashAlt} />
       this.state.posts.map((post, index) => {         
        if(post.idpost===idPost){  
            //eliminar el post de la lista la funcion splice nos devuelve el post eliminado     
           this.state.posts.splice(index,1);   
           //asignar la lista en el estate para que se actualice el componente
           this.setState({posts: this.state.posts});
        }
    });  
    }

    /**
     * Método que devuelve un true o false si el post esta en la lista de favoritos o no
     * @param idPost degine el identificador del post 
     * @returns 
     */
    esFavorito(idPost){
        let mostrar=false;
        this.state.postsFavoritos.map((postF) => {
            if(postF.idpost===idPost) {
               mostrar=true;
            }
        });
       return mostrar;
    }

    getPost(idPost){
        return this.postService.getPost(idPost);
    }

    /**
     * Método que añade o elimina un post de la lista de favoritos
     * @param {*} idPost 
     * @param {*} idUsuario 
     */
    postFavorito(idPost, idUsuario) {
        //si el post esta en la lista de favoritos
        if(this.esFavorito(idPost)){
            //elimina el post como favorito
            this.postService.eliminarPostFavorito(idUsuario,idPost);
            this.state.postsFavoritos.map((postFav, index) => {         
                if(postFav.idpost===idPost){
                    // eliminar el post favorito de la lista
                    this.state.postsFavoritos.splice(index,1);
                    //asignar la nueva lisa en el state
                   this.setState({postsFavoritos: this.state.postsFavoritos});
                }
            });
        }else{
            //guardar el post favorito
            this.postService.guardaPostFavorito(idPost, idUsuario);
            //obtener el post y añadirlo a la lista de favoritos para actualizar el 
            // state y que se renderize el componente
            this.postService.getPost(idPost).then(data =>{
                //añadir el post favorito a la lista
                this.state.postsFavoritos.push(data);
                this.setState({postsFavoritos: this.state.postsFavoritos})
            });      
        }    
        
    }

/**
 * Método que establece si se debe mostrar o no el botón para borrar post
 * 
 * @param {*} usuario 
 * @param {*} rolAdmistrador 
 * @param {*} idPost 
 * @returns 
 */
    mostrarIconoBorrarPost(usuario, rolAdmistrador, idPost){
        let boton;
        if(usuario!=null && usuario.roles.includes(rolAdmistrador)){
            boton = <span id ="iconoBorrarPost"  title="Borrar Post" onClick={() => this.eliminarPost(idPost)} className="m-1">
                                        <OverlayTrigger
                                            key={'left'}
                                            placement={'left'}
                                            overlay={
                                            <Tooltip id={'tooltip-left'}>
                                                Borrar post
                                            </Tooltip>
                                            }>
                                           <FontAwesomeIcon icon={faTrashAlt} />
                                        </OverlayTrigger>                    
                    </span>
        }
        return  boton;
    }

    mostrarIconoModificarPost(usuario, rolAdmistrador, post){
        let boton;
        if(usuario!=null && usuario.roles.includes(rolAdmistrador)){
            boton = 
                        <span id ="iconoModificarPost"  onClick={() =>this.modificarPost(post.idpost)}  className="m-1">
                                        <OverlayTrigger
                                            key={'right'}
                                            placement={'right'}
                                            overlay={
                                            <Tooltip id={'tooltip-left'}>
                                                Modificar post
                                            </Tooltip>
                                            }>
                                           <FontAwesomeIcon icon={faEdit} />
                                        </OverlayTrigger>                    
                        </span>
                        
        }
        return  boton;
    }

    mostrarIconoFavorito(usuario, rolRogistrado, idPost){
        let corazon;
        if(usuario!=null && usuario.roles.includes(rolRogistrado)){
            corazon =  <FontAwesomeIcon icon={this.esFavorito(idPost) ? corazonSolido : corazonHueco} 
            className="ml-auto align-self-start m-5" size="lg"
            onClick={() =>this.postFavorito(idPost, usuario.id)}/>
        }
        return  corazon;
    }


    componentDidMount() {
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        this.postService.getAll()
        .then(data => 
            this.setState({ posts: data }));
        if(usuario!=null){
            this.postService.getAllFavoritos(usuario.id)
            .then(data => 
                this.setState({ postsFavoritos: data }));
        }
    }

    render() {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        const rol_administrador= "ROLE_ADMINISTRADOR"; 
        const rol_registrado= "ROLE_REGISTRADO"; 
        return (
           
            <div className="d-flex flex-column">
                {
                    this.state.posts.map((post) => {
                        return (
                            <section className="col-md-12 d-flex align-items-center border m-1 p-1" key={post.idpost}>
                                <aside className="col-md-6">
                                    <Image src={require('../recursos/imagenes/' + post.imagen)} thumbnail />
                                </aside>
                                
                                <article className="col-md-6 d-flex flex-column align-items-center" >
                                        
                                        {this.mostrarIconoFavorito(usuario, rol_registrado, post.idpost)}
                                       
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


                                        
                                        <div className="m-2">
                                        {this.mostrarIconoBorrarPost(usuario,rol_administrador, post.idpost)}
                                       
                                        {this.mostrarIconoModificarPost(usuario, rol_administrador, post)}
                                       
                                        </div>                                      
                                      </BrowserRouter>
                                </article>
                            </section>
                        )
                    })
                }
            </div>
        )
    }
}