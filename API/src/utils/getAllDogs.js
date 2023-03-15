const axios = require('axios')
const { Dog , Temperaments} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY } = process.env;

     const getApiDogs = async ()=>{
      let response = await axios.get(
          `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
          
                response = response.data.map((el) => {
                const pesoTemp = el.weight.metric.split("-");
                const alturaTemp = el.height.metric.split("-");
                const imagen = el.image.url;
              
                 return {
                  id: el.id,
                  name: el.name,
                  height_min: alturaTemp[0],
                  height_max: alturaTemp[1],
                  weight_min: pesoTemp[0],
                  weight_max: pesoTemp[1],
                  life_span: el.life_span,
                  image: imagen,
                  userCreated: false,
                  temperaments: el.temperament
                };
              });

            return response;
      };

      const getBBDDDogs = async() =>{
        let dataDb = await Dog.findAll({
          include: Temperaments,
        });
        // FORMATEO PARA Q DESDE API Y DESDE DB LLEGUEN AL FRONT IGUALES
        dataDb = dataDb.map((el) => {
          return {
            id: el.id,
            name: el.name,
            height_min: el.height_min,
            height_max: el.height_max,
            weight_min: el.weight_min,
            weight_max: el.weight_max,
            life_span: el.life_span,
            image: el.image,
            userCreated: true,
            temperaments: el.temperaments.map((i) => {
              return i.name;
            }).join(", "),
          };
        });

        return dataDb;
      };

      const getAllDogs = async()=>{
        const dogsApi= await getApiDogs();
        const dogsBBDD = await getBBDDDogs();
        const allDogs = dogsApi.concat(dogsBBDD);
          return allDogs;
      };

      const getTemperaments = async() =>{
        const resultado = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
        const listaTemperamentos = resultado.data.map((dog) => {
            if (!dog.temperament) return (dog.temperament = undefined);
             const aux = dog.temperament.split(", ");
                return aux;
              });
    
        const limparValoresUndefined = listaTemperamentos.flat().filter(Boolean);
        const valoresUnicos = new Set(limparValoresUndefined); 
        const resultadoFinal = [...valoresUnicos]; 

          return resultadoFinal;
      };

 



module.exports = {getApiDogs, getTemperaments,  getAllDogs};