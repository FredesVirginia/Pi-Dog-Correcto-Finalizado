import React from 'react';
import  {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { getDetailBreed } from '../../Redux/actions';

import styles from "./BreedDogDetails.module.css"
export default function BreedDogDetails (){

    const detailsRecipe = useSelector(state=>state.dogDetail);
    console.log("EL detalle es ", detailsRecipe)
    const { id} = useParams();

    const dispatch = useDispatch();
    useEffect(()=>{    
         dispatch(getDetailBreed(id));
         
    },[id]);
    return (

        <div className={styles.divPDetails} >
          <div className={styles.divTitle}>
              <Link to="/dogs" className={styles.formLink} > Volver </Link>
              <h1 className={styles.h1D}> 🦴 The Woof Zone </h1>
          </div>

              
             
              <div className={styles.segundo} >
              <h2 className={styles.h2D}>{detailsRecipe.name}  </h2>   
              <div className={styles.divPD}>
                
                  <div className={styles.divImgD}>
             
                      <img alt= "Imagen Breed Dog "  className={styles.imageBreed} src={detailsRecipe.image}/>
                  </div>
                 <div className={styles.divD1}>
           
                <h4>Altura</h4>
                <p>Minimo : { detailsRecipe.height_min } cm</p>
                <p>Maximo : { detailsRecipe.height_max } cm</p>
                <h4> Peso</h4>
                <p>Minimo : { detailsRecipe.weight_min } kg</p>
                <p>Maximo : { detailsRecipe.weight_max } kg</p>
                <h4>Años de vida</h4>
                <p>{ detailsRecipe.life_span }</p>
            </div>
            <div  className={styles.divD2}>
                    <h4>Temperamentos: </h4>
                        <ul className={styles.ulDetails}>
                        {detailsRecipe.temperaments?.split(',').map(temp => (
                            <li key={temp}> 🐕‍🦺 {temp.trim()}</li>
                        ))}
                        </ul>
                
            </div>
            
             </div>
             
            
           
            
            </div>
        </div>
    );
}


