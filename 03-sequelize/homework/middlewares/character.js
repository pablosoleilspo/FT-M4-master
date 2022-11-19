const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();

// GET /character?race=human
router.get('/', async(req, res) => {
    try {
        const { race, age } = req.query;
    
        const condition = {};
        const where = {}; //where = { }
    
        if(race) where.race = race; // where: {race}
        if(age) where.age = age; // where : {age}
    
        condition.where = where;
    
        const character = await Character.findAll(condition) // { where: {race, age}}
        return res.status(200).json(character);
    } 
    catch (error) {
        return res.status(404).send(error.message);
    }
    // if(!race) {
    //     const characters = await Character.findAll();
    //     return res.status(200).send(characters);
    // }
    // else {
    //     const characters = await Character.findAll({
    //         where: { race }
    //     })
    //     res.json(characters);
    // }
})

router.get('/young', async (req, res)=> {
    try {
        const youngCharacter = await Character.findAll({
            where: {
                age: { [Op.lt]: 25 }
            }
        })
        return res.status(200).json(youngCharacter);
    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/roles/:code', async(req, res)=> {
    try {
        const { code } = req.params;
        const character = await Character.findByPk(code, {
            include: Role
        })
        res.status(200).json(character);

    } catch (error) {
        return res.status(404).send(error.message);
    }
})

router.get('/:code', async (req, res)=> {
    const { code } = req.params;

    const character = await Character.findByPk(code);
    if(!character) return res.status(404).send(`El código ${code} no corresponde a un personaje existente`)
    return res.json(character);
})


router.post('/', async(req, res)=> {
    const { code, hp, mana, name } = req.body;

    if(!code || !hp || !mana || !name) return res.status(404).send('Falta enviar datos obligatorios');

    try {
        const character = await Character.create(req.body);
        return res.status(201).send(character);
    } 
    catch (error) {
        return res.status(404).send('Error en alguno de los datos provistos')
    }
})


//RUTA PUT
router.put('/addAbilities', async(req, res)=> {
    try {
        const { abilities, codeCharacter} = req.body;

        const character = await Character.findByPk(codeCharacter);

        const promises = abilities.map(ab => character.createAbility(ab)) //generamos un array de promesas

        await Promise.all(promises);
        return res.status(200).send('Salió todo bien!!')
    } 
    catch (error) {
        return res.status(404).send(error.message);
    }
})




//RUTA PUT   /:attribute?value=
router.put('/:attribute', async(req, res)=> {
    try {
        const { attribute } = req.params;
        const { value } = req.query;
        await Character.update({ [attribute]: value }, {
            where: {
                [attribute] : null
            }
        });
        return res.status(200).send('Personajes actualizados');
    } 
    catch (error) {
        return res.status(404).send(error.message)
    }
})


module.exports = router;