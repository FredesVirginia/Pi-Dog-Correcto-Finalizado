import React  , {useRef}  from 'react';
import { useState , useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {  Link } from 'react-router-dom';
import styles from "./FormBreedDog.module.css";
import {createBreedDog , getTemperaments} from "./../../Redux/actions";
import Swal from 'sweetalert2';

export default function FormBreedDog() {
    console.log("Aqui Creado un BreedDog");
    const dispatch = useDispatch();
    const allTemperaments= useSelector(state=>state.temperaments);
    const [selectedTemperaments, setSelectedTemperaments] = useState([]);
     const[selectedOptions, setSelectedOptions] = useState([]);
    const [dataBreedDog, setDataBreedDog] = useState({
        name:"",
        life_span:"",
        image : "",
        height_min : "",
        height_max : "",
        weight_min : "",
        weight_max: "",
        temperaments: " ",
    });

    const [error, setError] = useState({});

     const setDataHandler = (e) => {
      e.preventDefault();
      setDataBreedDog({
          ...dataBreedDog,
          [e.target.name]: e.target.value,
      });
      setError({
        ...error,
        [e.target.name]: "",
      })
    };

    const handleSelectChange = (event) => {
      const options = Array.from(event.target.selectedOptions).map((option) => option.value);
      options.forEach((option) => {
        if (!selectedOptions.find((o) => o.name === option)) {
          setSelectedOptions([...selectedOptions, { name: option, isChecked: true }]);
        }
      });
    };
  
    const handleCheckboxChange = (event, option) => {
      const isChecked = event.target.checked;
      setSelectedOptions(
        selectedOptions.map((o) => (o.name === option ? { ...o, isChecked } : o))
      );
    };

    const handleSaveClick = () => {
      const selectedTemperaments = selectedOptions
        .filter((option) => option.isChecked)
        .map((option) => option.name);
        const temperamentsString = selectedTemperaments.join(", ");
      setDataBreedDog({
        ...dataBreedDog,
        temperaments:  temperamentsString,
      });
     
      console.log("Temperamentos seleccionados:", selectedTemperaments);
    };

    

    const submitForm = (e) => {
      let estadoForm=false;
      e.preventDefault()
      if(dataBreedDog.name.length === 0){
        setError({
          ...error,
         name: "Campo requerido"
        })
         estadoForm= false; 
      } else if ((dataBreedDog.height_min.length=== 0) ||( dataBreedDog.height_min === "0") || (dataBreedDog.height_min > 100) || (dataBreedDog.height_min >= dataBreedDog.height_max)){
        setError({
          ...error,
        height_min: "El dato debe ser distinto de cero, menor a 100 y menor y distinto a la altura maxima"
        })
        estadoForm= false; 
      } else if((dataBreedDog.height_max.length=== 0 )|| (dataBreedDog.height_max === "0") || (dataBreedDog.height_max > 100) || (dataBreedDog.height_max <= dataBreedDog.height_min)){
        setError({
          ...error,
        height_max: "El dato debe ser distinto de cero, menor a 100 ,mayor y distinto a la altura minima"
        })
        estadoForm= false; 
      }  else if ((dataBreedDog.weight_min.length=== 0) ||( dataBreedDog.weight_min === "0") || (dataBreedDog.weight_min > 100) || (dataBreedDog.weight_min > dataBreedDog.weight_max)){
        setError({
          ...error,
        weight_min:  "El dato debe ser distinto de cero, menor a 100 ,menor y distinto a la peso maximo"
        })
        estadoForm= false; 
      } else if((dataBreedDog.weight_max.length=== 0 )|| (dataBreedDog.weight_max === "0") || (dataBreedDog.weight_max > 100) || (dataBreedDog.weight_max < dataBreedDog.weight_min)){
        setError({
          ...error,
        height_max:  "El dato debe ser distinto de cero, menor a 100 ,mayor y distinto a la peso minimo"
        })
        estadoForm= false; 
      } else if ((dataBreedDog.life_span.length===0) || (dataBreedDog.life_span === "0") ){
        setError({
          ...error,
        life_span: "El dato requerido, y debe se mayor a 0"
        })
        estadoForm= false; 
      } else if (dataBreedDog.temperaments.length === 0){
        setError({
          ...error,
        temperaments: "Debe seleccionar almenos una opcion"
        })
         estadoForm= false; 
      } else {
        estadoForm= true; 
      }
    
      if(estadoForm){
      dispatch(createBreedDog(dataBreedDog));
      setDataBreedDog({
        name:"",
        life_span:"",
        image : "",
        height_min : "",
        height_max : "",
        weight_min : "",
        weight_max: "",
        temperaments: " ",
      })
      setSelectedOptions([]);
      Swal.fire({
        title: 'Se creo exitosamente',
        confirmButtonColor: "#34a57f"}
    ) 
       }else{
        
        Swal.fire({
          title: 'Error, datos incorrectos',
          confirmButtonColor: "#ff5733"}) 
      }
     
   }

    useEffect(() => {
       dispatch(getTemperaments());
    }, [dispatch]);

  return (
    <div>
     <div className={styles.divH}>
    
      <Link to="/dogs" className={styles.formLink} > Volver </Link>
       <h2 className={styles.h2Title}>  🦴 The Woof Zone</h2>
     </div>
      
      <form action=""  onSubmit={(e) => submitForm(e)} className={styles.form} >
          <div className={styles.containerImagen}> 
            <h2> Formulario  </h2>
          </div>
          <div className={styles.containerForm}>
           
           
            <div className={styles.divInput1}>
               
                <input  onChange={setDataHandler} placeholder="Name breed"  name="name" value={dataBreedDog.name} className={styles.inputForm} type="text" />
                 {error.name &&  (<p className={styles.error}>{error.name}</p>)}
            </div>
            <div className={styles.divInput1}>
          
            <input type="text" placeholder='Altura Minima'  onChange={setDataHandler} value={dataBreedDog.height_min}  name="height_min" className={styles.inputForm}></input>
            {error.height_min && (<label >{error.height_min}</label>)}
            </div>
           <div className={styles.divInput1}>
          
           <input  type="number" placeholder='Altura Maxima'  onChange={setDataHandler} value={dataBreedDog.height_max}  name="height_max"  className={styles.inputForm} />
           {error.height_max && (<label >{error.height_max}</label>)}
           </div>
          
          
            <div className={styles.divInput1}>
            
            <input  placeholder='Peso Minmo'  type="number" onChange={setDataHandler} value={dataBreedDog.weight_min} name="weight_min"   className={styles.inputForm}></input> 
            {error.weight_min && (<label >{error.weight_min}</label>)}
            </div>
            <div className={styles.divInput1}>
            
            <input placeholder= 'Peso Maximo'  type="number" onChange={setDataHandler} value={dataBreedDog.weight_max} name="weight_max" className={styles.inputForm}></input>
            {error.weight_max && (<label >{error.weight_max}</label>)}
            </div>
            <div className={styles.divInput1}>
            
            <input placeholder='Años de vida' type="text" onChange={setDataHandler} value={dataBreedDog.life_span} name="life_span" className={styles.inputForm}></input>
            {error.life_span && (<label >{error.life_span}</label>)}
            </div>
            
          
            
            <label> Temperaments</label>
          
            <select id="my-select"  onChange={handleSelectChange}  value={dataBreedDog.temperaments}className={styles.select} >
                    <option> Selecciona una Opcion</option>
                      {allTemperaments.length > 0 ? (
                       allTemperaments.map((t) => {
                    return <option key={t.id} value={t.name}> {t.name}  </option> 
                  })
                ) : (
                  <option> No hay Temperamentos</option>
                )}
      </select>
      <div className={styles.temperamentscontainer} >
      {selectedOptions.map((option) => (
        <div className={styles.temperaments} key={option.name} value={dataBreedDog.temperaments} name="temperaments">
          <label  value={selectedOptions}>
            <input
              type="checkbox"
              value={option.name}
              checked={option.isChecked}
              onChange={(e) => handleCheckboxChange(e, option.name)}
             
            />
            {option.name}
          </label>
        </div>
      ))}
      </div>
    
      {error.temperaments && (<label >{error.temperaments}</label>)}
      <button onClick={handleSaveClick} className={styles.botonF}>Enviar</button>
               
          </div>
      </form>
     
    </div>
  )
}
