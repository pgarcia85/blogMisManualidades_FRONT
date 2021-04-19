import axios from 'axios';
import authHeader from './auth-header';

class PostService {
    baseUrl = "https://blogmismanualidadesb.herokuapp.com";
    getAll() {
        return axios.get(this.baseUrl + "/wslistaPost")
            .then(res => res.data);

    }

    getPost(idpost) {
        return axios.get(this.baseUrl + "/wsPostId/" + idpost).then(res => res.data);

    }

    eliminarPost(idpost) {
        const p = authHeader();
        return axios.post(this.baseUrl + "/wsEliminarPost/" + idpost, { headers: authHeader() });
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
        return axios.post(this.baseUrl + "/wsPostFavoritosEliminar", {
            idPost,
            idUsuario
        }, { headers: authHeader() });
    }
}


export default PostService;