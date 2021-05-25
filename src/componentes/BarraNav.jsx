import React from 'react';
import { Nav } from 'react-bootstrap';


export default class BarraNav extends React.Component {

    render() {
      
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
                   
                </Nav>

            


        )
    }

}


