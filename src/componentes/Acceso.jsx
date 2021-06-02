import React from 'react';
import { Form, Button } from 'react-bootstrap';
import AuthService from "../service/AuthService";


export default class Acceso extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            mensaje: ""
        };
        this.authService = new AuthService();
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);


    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();
        this.setState({
            mensaje: ""
        });

        this.authService.login(this.state.username, this.state.password)
            .then(
                () => {
                    this.props.history.push("/posts");
                    window.location.reload();
                },
                error => {
                    const resMessage = (error.response && error.response.data &&
                        error.response.data.mensaje) || error.message || error.toString();

                    this.setState({
                        mensaje: resMessage
                    });
                }
            );
    }

    render() {
        return (
            <div className="container col-12 d-flex flex-column align-items-center" style={{
                'minHeight': '400px'
            }}>
                <div className="col-md-8 mt-5">
                {this.state.mensaje && (
                            <div className="form-group">
                                <div className={
                                    this.state.exito
                                        ? "alert alert-success"
                                        : "alert alert-danger"
                                }
                                    role="alert">
                                    {this.state.mensaje}
                                </div>
                            </div>
                        )}


                    <Form onSubmit={this.handleLogin} >
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email"
                                placeholder="Intruzca su email"
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                required 
                                maxLength="45"/>
                        </Form.Group>
                        <Form.Group controlId="contraseña">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password"
                                placeholder="Intruzca su contraseña"
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                required
                                maxLength="10"/>
                        </Form.Group>
                        <a href="/registro" className="color">¿Aún no tienes cuenta? Registrate pinchando aquí</a>
                        <br></br>

                        <Button type="submit" variant="dark"  style={{'float': 'right'}}> Entrar </Button>


                    </Form>
                </div>
            </div>
        )
    }

}