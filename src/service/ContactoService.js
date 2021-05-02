import axios from 'axios';

class ContactoService {
    baseUrl = "http://localhost:8080";

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