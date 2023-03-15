const {Router} = require ("express");
const {getApiDogs , getAllDogs} = require("../utils/getAllDogs");
const { Dog, Temperaments } = require("../db");
const {Sequelize} = require('sequelize');
const router= Router();



  router.get("/", async (req, res, next)=>{

    const {name } = req.query;                         // pido el name por query
  if (!name) {                                        // si no viene ningun nombre entra al if
    try {  
     const respuesta = await getAllDogs();
    res.status(200).json(respuesta);

      } catch(err) {
      res.json({err})
      console.error(err);
  }
  } else {                                     // si viene un nombre por params, va a entrar a este else
    const query = name.toLowerCase();          // hago que el nombre lo pase todo a minuscula , asi no tengo problemas mas adelante para filtrar
    try {
      const recipeApiInfo = await getApiDogs();
      const recipeApi = recipeApiInfo.filter((r) =>{
        if(r.name.toLowerCase().includes(query)){      // si el titulo de la receta que traigo desde la api , incluye el nombre que me pasaron por params 
          return r                                     // va a retornarlo dentro del array del filter
        }
       } 
      );

      const recipeBD = await Dog.findAll({       // los mismo que lo anterior, pero ahora desde la DB
        where: {
          name:{[Sequelize.Op.like]:`%${query}%`}  // op(funcion de sql) --> va a filtrar si encuentra algun titulo parecido al nombre que me pasan por query 
        }, include : {
          model : Temperaments,
          attributes : ['name'],
          through: {
              attributes:[]
          }
      }
     
      });

      const respuesta = await Promise.all(recipeBD.concat(recipeApi)) // una vez que terminan todas la promesas , concateno las dos informaciones
      console.log(respuesta.length);
      if(respuesta.length===0) res.send( respuetasAll) // si no matcheo ninguna de las dos, es decir que no esxiste el nombre que me pasaron lor query
      res.send(respuesta)  ; // hago que devuelva todas las recetas

    } catch(err) {
      res.json({err})
      console.error(err);
  }
  }
    });
   

  router.get("/:id", async(req, res, next)=>{
    try{
      const {id}= req.params;  
      const allDogs = await getAllDogs();
      
      let resp = allDogs.find((el) => el.id.toString() === id.toString());
      res.status(200).json(resp);

    }catch(error){
        res.status(404).send("No se encontro")  }
  });


  router.post("/", async (req, res)=>{
      //CODIGO CORRECTISIMO
  try {
      const {
      name, height_min,height_max,weight_min,weight_max,life_span,temperaments, } = req.body;
      let image= "https://img.freepik.com/vector-premium/lindo-labrador-retriever-perro-sentado-dibujos-animados-vector-icono-ilustracion-icono-naturaleza-animal-aislado_138676-6618.jpg?w=2000"
      let dogCreated = await Dog.create({name,height_min, height_max, weight_min, weight_max, life_span,image });

     
        let temp = await Temperaments.create({
          name: temperaments,
        });
      dogCreated.addTemperaments(temp);
      let dog = await Dog.findAll(  {
              include : {
                  model : Temperaments,
                  attributes : ['name'],
                  through: {
                      attributes:[]
                  }
              }
          }
      );
     console.log("El dog es ", dog)
    res.status(200).json(dog)
    }catch(error){
    
          res.status(404).send("Informe de Errores",error) 
      }
  });

module.exports= router;