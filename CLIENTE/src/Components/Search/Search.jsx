import React , {useState, useRef, useEffect}from 'react';
import {useDispatch, useSelector} from "react-redux";
import { getAllBreedDog , getBreedDogName ,getTemperaments , getDogsForTemperament,getBreedDogBBDD , getBreedDogApi , orderAscending , orderDescending , orderWeightMinAsc, orderWeightMinDesc , orderWeightMaxAsc , orderWeightMaxDesc} from '../../Redux/actions';
import styles from "./Search.module.css"
import {Link} from "react-router-dom";


const Search = () => {

  const dispatch= useDispatch();
  const [breedDog, setBreedDog] = useState (" ");
  const [temperaments , setTemperaments] = useState(" ");
  const [breed, setBreed] = useState(" ");
  const [order, setOrder] = useState (" ");
  const [nameBreed , setNameBreed] = useState(" ");
  const allBreedDog = useSelector(state=>state.dogs);
  const [errorr, setErrorr] = useState(" ");
  const allTemperaments = useSelector(state=>state.temperaments);
  console.log("LOS TEMPERAMENTS SON " , allTemperaments.length);
 
 
    const breedName = useRef();
  
      useEffect(() => {
          if(temperaments!== " "){
                dispatch(getDogsForTemperament(temperaments))
          }
           if (temperaments === " "){
            dispatch(getAllBreedDog());
            dispatch(getTemperaments());
          } 
           if (temperaments ==="inicio"){
            dispatch(getAllBreedDog());
            dispatch(getTemperaments());
          }
          
        
      }, [dispatch, temperaments ]);

      

      useEffect(()=>{
        if(breed ==="user"){
          console.log("Aqui en el dispatch de dogBase de Datos");
          console.log("EL estado del bred es ", breed);
          dispatch(getBreedDogBBDD());
          
        }

        if(breed === "api"){
          console.log("Aqui en el dispatch de dogApi API");
          console.log("El estado del breed es ", breed);
          dispatch(getBreedDogApi());
        }

        if(breed==="inicio"){
          console.log("Aqui en el dispatch de dogApi INICIO");
          console.log("El estado del breed es ", breed);
          dispatch(getAllBreedDog());
        }
      },[dispatch,breed])
  
      useEffect(()=>{
        if(order ==="inicio"){
          dispatch(getAllBreedDog())
        }
        if(order ==="asc"){
          dispatch(orderAscending());
        }
        if(order ==="desc"){
          dispatch(orderDescending());
        }
       
        if(order === "pesoMinAsc"){
          dispatch(orderWeightMinAsc())
        }
        if(order === "pesoMinDesc"){
          dispatch(orderWeightMinDesc());
        }
        if(order === "pesoMaxAsc"){
          dispatch(orderWeightMaxAsc())
        }
        if(order === "pesoMaxDesc"){
          dispatch(orderWeightMaxDesc())
        }

      },[dispatch,order])

      

      function handleChange(e){
        setBreedDog(e.target.value)
        dispatch(getBreedDogName(e.target.value))
        
        }

    return (
        <div className={styles.divSearch}>
        
          <div className={styles.divTemperaments}>
          <label> Filtrar por </label>
          <div className={styles.select} >
              <label>Temperamentos</label>
              <select className={styles.divTemperamentsSelect}  onChange={(e) => setTemperaments(e.target.value) }>
              
              <option className={styles.divTemperamentsSelectOption} value="inicio">--Seleccione--</option>
              {allTemperaments.length > 0 ? allTemperaments.map((t) => {
                      return <option  className={styles.divTemperamentsSelectOption} key ={t.id}value={t.name}> {t.name} </option>
                      })
                      : 
              <option>---</option>
              }
              </select>
              <label className={styles.labelOrigen}>Origen </label>
              <select className={styles.divTemperamentsSelect} value={nameBreed} onChange= {(e)=> setBreed(e.target.value)} >
              <option value="inicio">--Selecione--</option>
              <option value="api"> Api</option>
              <option value="user"> Creado por Usurio</option>
              </select>
          </div>
          
          </div>
          
          <div className={styles.divBreed}>
          
          <Link to="/" className={styles.formLink} >🦴 The Woof Zone </Link>
          <input className={styles.buscar} onChange={handleChange} type="text"  placeholder="Look For Breed 🐶" /> 
          
          </div>

          <div className={styles.divCreate}>
          <Link  className={styles.breed}  to="/createBreedDog"> Create Breed Dog </Link>
           <label> Ordenar por </label>
          <select  className={styles.order} onChange = {(e)=> setOrder(e.target.value)} >
            <option value="inicio">--Seleccione--</option>
            <option value = "asc"  >A-Z</option>
            <option value = "desc" >Z-A</option>
            <option value = "pesoMinAsc">  Peso Minimo Ascendete</option>
            <option value = "pesoMinDesc"> Peso Minimo Desendente</option>
            <option value = "pesoMaxAsc">  Peso Maximo Ascendete</option>
            <option value = "pesoMaxDesc"> Peso Maximo Desendente</option>
          </select>
          </div>
            
           
          
        </div>
    );
    }

export default Search;
