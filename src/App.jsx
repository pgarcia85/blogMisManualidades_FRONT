import React from 'react';
import './recursos/css/App.css';
import Cabecera from './componentes/Cabecera';
import BarraNav from './componentes/BarraNav';
import ListaPosts from './componentes/ListaPosts';
import SobreMi from './componentes/SobreMi';
import DetallePost from './componentes/DetallePost';
import Contacto from './componentes/Contacto';
import Acceso from './componentes/Acceso';
import Registro from './componentes/Registro';
import DatosPersonales from './componentes/DatosPersonales';
import Pie from './componentes/Pie';
import { BrowserRouter, Route } from 'react-router-dom';
import AuthService from "./service/AuthService";
import { Nav, NavDropdown, OverlayTrigger, Tooltip} from 'react-bootstrap';
import NuevoPost from './componentes/NuevoPost';
import ListaPostsFavoritos from './componentes/ListaPostsFavoritos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import ModificarPost from './componentes/ModificarPost';
import ListaUsuarios from './componentes/ListaUsuarios';

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            usuarioActual: undefined,
            rolRegistrado: false
        };
        this.authService = new AuthService();
        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        const usuario = this.authService.getUsuarioActual();

        if (usuario) {
            this.setState({
                usuarioActual: this.authService.getUsuarioActual()
            })
        }
    }

    
    logOut() {
        this.authService.logout();
    }

    render() {
        const usuario = this.authService.getUsuarioActual();
        const usuarioActual = this.state;
        let opcionListaUsuarios;
        let opcionNuevoPost;
        if(usuario !=null && usuario.roles.includes("ROLE_ADMINISTRADOR")){
            opcionListaUsuarios= <NavDropdown.Item  href="/listaUsuarios">Usuarios</NavDropdown.Item>;
            opcionNuevoPost= <NavDropdown.Item  href="/nuevoPost">Nuevo Post</NavDropdown.Item>;
       }
      
        return (<div className="App container" >
            <Cabecera />
            {usuarioActual.usuarioActual ? (

                <Nav className="justify-content-end" bg="light" >
                    <NavDropdown title={usuarioActual.usuarioActual.email} id="nav-dropdown" className="color">
                        {opcionListaUsuarios}
                        {opcionNuevoPost}
                        <NavDropdown.Divider />
                        <NavDropdown.Item  href={"/datosPersonales/"+ usuarioActual.usuarioActual.id} >Datos Personales</NavDropdown.Item>
                        <NavDropdown.Item  href={"/favoritos/"+ usuarioActual.usuarioActual.id} >Favoritos</NavDropdown.Item>                     
                        <NavDropdown.Item  href="/posts" onClick={this.logOut}>Cerrar Sesión</NavDropdown.Item>                      
                    </NavDropdown>
                </Nav>
            ) : (
                    <Nav className="justify-content-end" activeKey="/acceso">
                        <Nav.Item>
                            <Nav.Link href="/acceso" eventKey="link-1"> 
                                <OverlayTrigger
                                key={'left'}
                                placement={'left'}
                                overlay={
                                <Tooltip id={'tooltip-left'}>
                                    Acceso
                                </Tooltip>
                                }>
                                <FontAwesomeIcon icon={faUser} size="lg" className="color"/>
                            </OverlayTrigger>    
                                </Nav.Link>       
                            </Nav.Item>
                    </Nav>

                )}
            <BarraNav />
           
            <BrowserRouter >
                <Route path="/sobreMi" exact component={SobreMi} />
                <Route path="/posts" exact component={ListaPosts} />
                <Route path="/detallePost/:id" exact component={DetallePost} />
                <Route path="/contacto" exact component={Contacto} />
                <Route path="/acceso" exact component={Acceso} />
                <Route path="/registro" exact component={Registro} />
                <Route path="/datosPersonales/:id" exact component={DatosPersonales} />
                <Route path="/nuevoPost" exact component={NuevoPost} />
                <Route path="/favoritos/:id" exact component={ListaPostsFavoritos} />
                <Route path="/modificarPost/:id" exact component={ModificarPost} />
                <Route path="/listaUsuarios" exact component={ListaUsuarios} />
                <Route path="/" exact component={ListaPosts} />
            </BrowserRouter>
            <Pie/>

        </div>

        );
    }
}