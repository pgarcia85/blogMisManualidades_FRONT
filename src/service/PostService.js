import axios from 'axios';
import authHeader from './auth-header';

class PostService {
    baseUrl = "https://blogmismanualidadesb.herokuapp.com";
    getAll() {
        return axios.get(this.baseUrl + "/wslistaPost", { headers: authHeader() })
            .then(res => res.data);

    }

    getPost(idpost) {
        return axios.get(this.baseUrl + "/wsPostId/" + idpost).then(res => res.data);

    }

    eliminarPost(idpost) {
        return axios.delete(this.baseUrl + "/wsEliminarPost/" + idpost, { headers: authHeader() });
    }

    modificarPost(idpost, titulo, resumen, texto) {
        return axios.post(this.baseUrl + "/wsPostUpdate/", {
            idpost,
            titulo,
            resumen,
            texto
        }, { headers: authHeader() });
    }

    guardaPost(titulo, resumen, texto) {
        return axios.post(this.baseUrl + "/wsInsertaPost", {
            titulo,
            resumen,
            texto
        }, { headers: authHeader() });
    }

    guardaPostFavorito(idPost, idUsuario) {
        return axios.post(this.baseUrl + "/wsUsuarioGuardarPostFavorito", {
            idPost,
            idUsuario
        }, { headers: authHeader() });
    }

    getAllFavoritos(idUsuario) {
        return axios.get(this.baseUrl + "/wsPostFavoritos/" + idUsuario, { headers: authHeader() })
            .then(res => res.data);

    }

    eliminarPostFavorito(idUsuario, idPost) {
        return axios.delete(this.baseUrl + "/wsPostFavoritosEliminar/" + idUsuario + "/" + idPost, { headers: authHeader() });
    }
}


export default PostService;