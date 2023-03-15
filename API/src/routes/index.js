const { Router } = require('express');
const dog = require("./dog");
const temperaments = require("./temperaments");

const router = Router();

    router.use("/dogs", dog);
    router.use("/temperaments", temperaments);


module.exports = router;
