import React from 'react';
import { Nav } from 'react-bootstrap';


export default class BarraNav extends React.Component {

    render() {
          //obtener el usuario, para saber quien inserta el comentario
          const usuario = JSON.parse(localStorage.getItem("usuario"));
          const rol_administrador= "ROLE_ADMINISTRADOR"; 
          let crearPost;
          if(usuario!=null && usuario.roles.includes(rol_administrador)){
                crearPost= 
                <Nav.Item className="border">
                    <Nav.Link href="/nuevoPost" eventKey="nuevoPost" className="color">Nuevo Post</Nav.Link>
                </Nav.Item>
          }
        return (
            
                <Nav justify fill variant="tabs" defaultActiveKey="/posts" className="col-md-12 barra">
                    <Nav.Item className="border" >
                        <Nav.Link  href="/sobreMi" eventKey="sobreMi" className="color">Un Poco Sobre Mi</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="border">
                        <Nav.Link href="/posts" eventKey="posts" className="color">El Blog</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="border">
                        <Nav.Link href="/contacto" eventKey="contacto" className="color">Contacto</Nav.Link>
                    </Nav.Item>
                    {crearPost}
                   
                </Nav>

            


        )
    }

}


