
import styles from "./BreedDog.module.css";
import {Link} from 'react-router-dom';
import React from 'react';

export default function BreedDog  (props)  {
    const {id, name,life_span ,image,temperaments} = props;
    return (
        <div className={styles.containerBreedDog}>
           
           <img alt="Hola" className={styles.imgBreedDog} src={image}/> 
           <h2> {name} </h2> 
           <h3 className={styles.containerH3Breed}> Año de Vida :{life_span}</h3>
            <div className={styles.containerTem}>
              <h5> Temperamentos : {temperaments}</h5>
            </div>
            <div className={styles.cajaLink}>
            <Link to={`/dogs/${id}`}  className={styles.linkR} >Mas Informacion</Link>  
            </div>
        </div>
    );
}


