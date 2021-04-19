export default function authHeader() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario && usuario.token) {
        return {
            Authorization: 'Bearer ' + usuario.token
        }
    } else {
        return {};
    }
}