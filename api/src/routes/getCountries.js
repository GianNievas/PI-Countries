const { Router } = require('express');
const { Country, Activity } = require('../db');
const { Op } = require("sequelize");
const axios = require('axios');

const route = Router();

route.get('/', async (req, res) => {
    const { name } = req.query;  

    if(name){
        const resultado = await Country.findAll({
            where: {
                name:{
                    [Op.iLike]: `%${name}%`
                }
            },
            include: Activity 
        })

        if(resultado.length === 0){
            return res.status(404).json({
                msg: "País no encontrado"
            })
        }

        res.status(200).json(resultado)
    }
    else{
        const resultado = await Country.findAll({
            include: {
                model: Activity,
                attributes: ["name"]
            }
        })
        res.status(200).send(resultado)
    }

})

route.get('/:idPais', async (req, res) => {
    const { idPais } = req.params

    const existe = await Country.findAll({
        where:{
            ID: idPais
        },
        include: Activity
    })

    if(existe){
        res.json(existe)
    }
    else return res.status(404).json({
        msg: "País no encontrado"
    })
})

module.exports = route;