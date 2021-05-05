import React from 'react';
import {Image } from 'react-bootstrap';
import FotoPortada from '../recursos/imagenes/portada.png';

export default class Post extends React.Component {

   

    render() {
        return ( <div className = "col-12 border mt-3 pt-3"
            style = {
                {
                    position:'relative',
                    width:'100%'
                }
            } >
               <p className="m-1 col-12" style={{
                textAlign: 'center',
                fontSize :'200%'
            }}>Bienvenido al blog donde encontrarás miles de ideas para dar una segunda vida a las cosas</p>
            <Image src = {FotoPortada} fluid  style={{
                display:'block',
                margin: 'auto'
            }}/>

            </div>


        )
    }


}