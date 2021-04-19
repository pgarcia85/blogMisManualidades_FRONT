import React from 'react';
import {Image } from 'react-bootstrap';
import Logo from '../recursos/imagenes/logo.jpg';

export default class Post extends React.Component {

   

    render() {
        return ( <div className = "col-12 p-2"
            style = {
                {
                    position:'relative',
                    width:'100%'
                }
            } >
            <Image src = {Logo} fluid  style={{
                display:'block',
                margin: 'auto'
            }}/>
            <strong><p className="m-1" style={{
                textAlign: 'center',
            }}>Blog de manualidades</p></strong>
            </div>


        )
    }


}