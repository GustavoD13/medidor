const express = require('express');
const router = express.Router();

const Cliente = require('../models/Cliente');

router.get('/', async(req, res) => {
    const clientes = await Cliente.find({});
    res.json(clientes);
});

router.get('/:id', async(req, res) => {
    const cliente = await Cliente.findById(req.params.id);
    res.json(cliente);
});

router.post('/', async(req, res) => {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.json({
        status: 'cliente saved'
    });
});

router.put('/:id', async(req, res) => {
    await Cliente.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Cliente Updated'
    });
});

router.delete('/:id', async(req, res) => {
    await Cliente.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Cliente deleted'
    });
});

module.exports = router;