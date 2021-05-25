import axios from 'axios';
import authHeader from './auth-header';

class AuthService {
    baseUrl = "https://blogmismanualidadesb.herokuapp.com/";

    login(email, contrasenia) {
        return axios
            .post(this.baseUrl + "api/auth/singin", {
                email,
                contrasenia
            })
            .then(response => {
                if (response.data.token) {
                    //cuando se loguea un usuario se guarda en el almacenamiento local
                    localStorage.setItem("usuario", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        ///cuando se hace logout un usuario se elimina del almacenamiento local
        localStorage.removeItem("usuario");
    }

    registrar(nombre, apellidos, direccion, telefono, email, contrasena) {
        return axios.post(this.baseUrl + "api/auth/singup", {
            nombre,
            apellidos,
            direccion,
            telefono,
            email,
            contrasena
        });
    }

    getUsuarioActual() {
        return JSON.parse(localStorage.getItem("usuario"));
    }

    getAllUsuarios() {
        return axios.get(this.baseUrl + "wsUsuarios", { headers: authHeader() }).then(res => res.data);
    }

    eliminarUsuario(idUsuario) {
        return axios.delete(this.baseUrl + "wsEliminarUsuario/" + idUsuario, { headers: authHeader() })
    }

}

export default AuthService;