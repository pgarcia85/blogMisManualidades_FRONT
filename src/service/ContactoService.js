import axios from 'axios';

class ContactoService {
    baseUrl = "https://blogmismanualidadesb.herokuapp.com";

    enviarEmail(nombre, email, asunto, texto) {
        return axios.post(this.baseUrl + "/wsEnviarEmail", {
            nombre,
            email,
            asunto,
            texto
        });
    }
}

export default ContactoService;