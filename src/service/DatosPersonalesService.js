import axios from 'axios';
import authHeader from './auth-header';

class DatosPersonalesService {
    baseUrl = "https://blogmismanualidadesb.herokuapp.com";

    getDatosPersonales(idUsuario) {
        return axios.get(this.baseUrl + "/wsUsuarioId/" + idUsuario, { headers: authHeader() }).then(res => res.data);
    }

    updateDatosPersonales(id, nombre, apellidos, direccion, telefono) {
        return axios.post(this.baseUrl + "/wsUsuarioUpdate", {
            id,
            nombre,
            apellidos,
            direccion,
            telefono
        }, { headers: authHeader() });
    }
}


export default DatosPersonalesService;