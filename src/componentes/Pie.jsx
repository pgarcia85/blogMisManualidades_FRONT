import React from 'react';

export default class Post extends React.Component {

   

    render() {
        return ( 
            
                <div className="d-flex flex-wrap justify-content-center align-content-center border-top mt-4" style={{
                        height:'100px'
                    }}>
                    <div><i className="pi pi-facebook m-1" style={{ fontSize: '1.5em' }}></i></div>
                    <div><i className="pi pi-camera " style={{ fontSize: '1.5em' }}></i></div>
                </div>
            


        )
    }


}