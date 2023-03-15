import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllBreedDog } from "../../Redux/actions";
import BreedDog from '../BreedDog/BreedDog';
import React from 'react';
import "./BreedDogs.css";
import Paginator from '../Paginator/Paginator';

export default function BreedDogs ()  {

    const breedDogs = useSelector(state=>state.dogs);
    const actualPage = useSelector(state => state.actualPage);
    const dispatch = useDispatch();
    console.log("Cantidad de Dogs = " , breedDogs.length);
   
    useEffect(() => {
        dispatch(getAllBreedDog());
     }, []);
  
     return (
         <div>
           <div className='containerBreeds'>
            
           {breedDogs.length > 0 ? breedDogs.map((breed, index) =>{
        // Se crea un CardCountry por cada country en el state. Si es la pagina 1, solo muestra 9 countries
        if(actualPage === 1 & index <9){
          return ( 
         <BreedDog  
                    key={breed.id}
                    id={breed.id}
                    name={breed.name.toString()}
                    life_span={breed.life_span}
                    image={breed.image}
                    height_min={breed.height_min}
                    height_max={breed.height_max}
                    weight_min={breed.weight_min}
                    weight_max={breed.weight_max}
                    temperaments={breed.temperaments}
                    />
)
        }
        else if(actualPage !== 1 && index >= ((actualPage-1)*10)-1 && (index < (actualPage*10)-1)){
          // Se crea un CardCountry por cada country en el state. Si no es la pagina 1, muestra 10 countries
          return (<BreedDog
                    key={breed.id}
                    id={breed.id}
                    name={breed.name.toString()}
                    life_span={breed.life_span}
                    image={breed.image}
                    height_min={breed.height_min}
                    height_max={breed.height_max}
                    weight_min={breed.weight_min}
                    weight_max={breed.weight_max}
                    temperaments={breed.temperaments}
                    />)}}): 
          <div >
            <p>No hay paises. Intenta otra busqueda.</p>
          </div>}
           </div> 
           
          <div>
             <Paginator dogsLength={breedDogs.length}/>
          </div>
          
         </div>
    );
}


