const {Router} = require("express");
const {getTemperaments} = require("../utils/getAllDogs");
const {Temperaments} = require("../db");
const axios = require("axios");
const { API_KEY } = process.env;
const router= Router();

router.get("/",async (req, res,next) =>{
  console.log("El temperament desde el back es ");
    try {
        const allTemperaments = await getTemperaments()
       allTemperaments.forEach((dog) =>
          Temperaments.findOrCreate({
            where: {
              name: dog,
            },
          })
        );
    
        const resultado2 = await Temperaments.findAll(); // Me traigo todos los temperamentos de la base de datos
       
        res.status(200).send(resultado2);
      } catch (error) {
        next(error);
      }
});

module.exports= router;

