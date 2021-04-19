import axios from 'axios';

class AuthService {
    baseUrl = "https://blogmismanualidadesb.herokuapp.com/api/auth/";

    login(email, contrasenia) {
        return axios
            .post(this.baseUrl + "singin", {
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
        return axios.post(this.baseUrl + "singup", {
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

}

export default AuthService;