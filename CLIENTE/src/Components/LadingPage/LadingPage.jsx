import React from 'react';
import "./LadingPage.css";
import { Link } from "react-router-dom";


const LadingPage = () => {
    return (
        <div className='containerLadding'>
                <div className='h1Ladding'>
                    <h1> 🦴The Woof Zone</h1>
                </div>
                <div  className='pLadding'>
                     <p className="p">
                    Encuentra mas 300 razas de Perros en nuestra Web!
                     </p>
                </div>
           
            <Link to="/dogs"> <button className="btnLadding">Vamoos</button> </Link>
        </div>
    );
}

export default LadingPage;
