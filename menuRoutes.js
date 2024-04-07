const express = require("express");
const router = express.Router();
const Menu = require('./menuItem');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new Menu(data);
        const response = await newMenu.save();
        console.log('data saved:', response);
        res.status(200).json(response);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/', async (req, res) => {
    try{
        const data = await Menu.find();
        console.log(data);
        res.status(200).json(data);
    }catch(err){

        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
module.exports = router;