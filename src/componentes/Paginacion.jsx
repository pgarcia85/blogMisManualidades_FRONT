import React from 'react';


export default class Paginacion extends React.Component {

    render(){
        const{postPerPage, totalPosts, paginate}= this.props;
        const pageNumbers= [];
        let b =Math.ceil(totalPosts/ postPerPage);
        for(let i=1; i<= b; i++){
            pageNumbers.push(i);
        }
            return(
                <nav className="mt-2">
                <ul className="pagination justifity-content-center">
                   
                    {pageNumbers.map(num=>(
                        <li className="page-item" key={num}>
                            <a onClick={()=> paginate(num)} className="page-link" href="#">{num}</a>
                        </li>
                    ))}
                   
                </ul>
                </nav>
            )

        
    }

}