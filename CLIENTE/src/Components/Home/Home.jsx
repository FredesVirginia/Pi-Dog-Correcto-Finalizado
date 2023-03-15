import React , {useState} from 'react';
import Search from "../Search/Search";
import BreedDogs from '../BreedDogs/BreedDogs';
import Paginator from "../Paginator/Paginator";
import { useSelector } from 'react-redux';
const Home = () => {
 

    return (
        <div>
             
            <Search/>
            <BreedDogs /> 
        </div>
    );
}

export default Home;
