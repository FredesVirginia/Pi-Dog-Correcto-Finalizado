import axios from "axios";




    export  function getAllBreedDog (){
        return async function(dispatch){
            try {
                const allBreedDogs = await axios.get("http://localhost:3001/dogs");
            
                return dispatch({
                    type: "GET_ALL_BREED_DOG",
                    payload: allBreedDogs.data
                })
            } catch (error) {
                console.log("INFORMA DE ERRORES 1987" , error);
            }
        }
    }

    export function getBreedDogName(breed){
        return async function(dispatch){
            try {
                console.log("EL name desde el front es ", breed)
                const breedDog = await axios.get(`http://localhost:3001/dogs/?name=${breed}`)
                const resultado = breedDog.data;
                   return dispatch({
                    type: "GET_NAME_BREED_DOG",
                    payload: resultado
                  });
            
            }catch (error) {
                console.log("Informe de Errores 123", error);
                return (error);
            }
            
    }
    }

    export  function getTemperaments(t){
        return async function (dispatch){
            try{   
            const alltemperaments = await axios.get("http://localhost:3001/temperaments");
            console.log("Tempermanet desde action es ", alltemperaments.data)
            return dispatch({
                type : "GET_ALL_TEMPERAMENTS",
                payload: alltemperaments.data
            });
            }catch(error){
                console.log("Informe de errors", error)
            }
        }
    }

    export function getDogsForTemperament(temp) {
        return async function (dispatch) {
        try {
            const resp = await axios.get("http://localhost:3001/dogs/");
            let aux = resp.data.filter((el) => {
            return el.temperaments && el.temperaments.split(", ").includes(temp);
            });
    
            dispatch({
            type: "GET_DOGS_FOR_TEMP",
            payload: aux,
            });
        } catch (error) {
            console.log(error);
        }
        };
    }
    export function getBreedDogBBDD(){
        return async function(dispatch){
            try{
            const response = await axios.get("http://localhost:3001/dogs/");
            let aux = response.data.filter((el)=>{
                return el.userCreated===true;
            })
            console.log("El dato desde action es ", aux);
                dispatch({
                    type: "GET_DOG_BBDD",
                    payload: aux,
                })

            }catch(error){
                console.log("EL error desde action es " , error)
            }
        }
    }

    export function getBreedDogApi(){
        return async function (dispatch){
            let response = await axios.get("http://localhost:3001/dogs/");
            let aux = response.data.filter((el)=>{
                return el.userCreated === false;
            });
            try{
                    dispatch({
                        type: "GET_BREED_API",
                        payload : aux
                    })
            }catch(error){
            console.log("Informe de errores", error);
            }
        }
    }

    export function getDetailBreed(id) {
        return async function (dispatch) {
            try{
                const res = await axios.get(`http://localhost:3001/dogs/${id}`);
                console.log("Es",res.data);
                dispatch({
                    type: "GET_DETAIL",
                    payload: res.data,
                })
            } catch (error) {
                console.log(error)
            }
        }
    }

    export function createBreedDog(breedDog){
        return async function (dispatch){
            try{
                const newBreedDog = await axios.post("http://localhost:3001/dogs",breedDog);
                console.log("El BREED DESDE ACTION ES ", breedDog);
               
                    dispatch({
                        type: "POST_BREED_DOG"
                    })
               
            }catch(error){
                console.log("Informe de errores desde Action" , error);
                return error;
            }
        }
    }

    export function changePage(page){
        return {
            type: "CHANGE_PAGE",
            payload : page
        }
    }
    export function orderAscending(){
       return {
        type: "ORDER_ASCENDING"
       }
    }
    
    export function orderDescending(){
        return {
            type: "ORDER_DESCENDING"
        }
    }
    
    export function orderWeightMinAsc(){
        return {
            type: "ORDER_WEIGHT_MIN_ASC"
        }
    }

    export function orderWeightMinDesc(){
        return {
            type: "ORDER_WEIGHT_MIN_DESC"
        }
    }

    export function orderWeightMaxAsc(){
        return {
            type: "ORDER_WEIGHT_MAX_ASC"
        }
    }

    export function orderWeightMaxDesc(){
        return {
            type: "ORDER_WEIGHT_MAX_DESC"
        }
    }
                
                  
                    
