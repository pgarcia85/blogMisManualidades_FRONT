import axios from 'axios';
import authHeader from './auth-header';

class ComentarioService {
    baseUrl = "http://localhost:8080";

    getComentariosPost(idPost) {
        return axios.get(this.baseUrl + "/wsComentariosPost/" + idPost).then(res => res.data);
    }

    saveComentario(comentario) {
        return axios.post(this.baseUrl + "/wsInsertaComentario", comentario, { headers: authHeader() }).then(res => res.data);
    }

    deleteComentario(idcomentario) {
        const p = authHeader();
        return axios.post(this.baseUrl + "/wsEliminarComentario/" + idcomentario, { headers: authHeader() });
    }

    getComentario(idcomentario) {
        return axios.get(this.baseUrl + "/wsComentario/", idcomentario, { headers: authHeader() }).then(res => res.data);
    }
}


export default ComentarioService;