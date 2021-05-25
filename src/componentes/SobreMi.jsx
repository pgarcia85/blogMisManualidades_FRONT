import React from 'react';
import {Image } from 'react-bootstrap';
import FotoPortada from '../recursos/imagenes/portada.png';

export default class BarraNav extends React.Component {



    render() {
        return (

            <div className="container col-12 d-flex flex-column align-items-center">
                 
                
                <div className="col-8 mt-5">
                    <p>Hola, os doy la bienvenida a mi blog</p>
                    <p>He vivido toda mi vida rodeada de preciosas mantas hechas a ganchillo
                    y calceta, confortables juegos de cama bordadas a mano y rematadas
                    con encajes de bolillos, ganchillos y cenefas. Exquisitas mantelerias bordadas a punto de cruz,
                    lagarteras....y alto etcétera de labores realizadas por mi madre a lo larfo de muchos años.
                    </p>
                    <p>
                        A mi, como a mi madre, nos encanta hacer cosas con las manos como crochet y calceta con la
                        finalidad de decorar nuestras casas y a nosotras mismas.
                    </p>
                    <p>
                        Aquí os presento mi blog "mis manitas" que pretende marcar una nueva etapa en mi vida
                        con la divulgación de la obra de mi madre y la mía propia, así como diferentes reportajes de
                        decoración y muchas más sorpresas.
                    </p>
                    <p>Espero que os guste</p>
                </div>

                <Image src = {FotoPortada} fluid  style={{
                display:'block',
                margin: 'auto',
                width: '900px',
                height: '700px'
                }} />
            </div>

        )
    }

}

