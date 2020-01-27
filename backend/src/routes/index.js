const router = require('express').Router();
const Plato = require('../models/plato');
const Comanda = require('../models/comanda');

async function calcularTotal(pedidos){
    let total = 0;

    for (let i = 0; i < pedidos.length; i++) {
        const plato = await Plato.findOne({nombre: pedidos[i].nombre});
        total += plato.precio * pedidos[i].cantidad;
    }

    return total;
}

router.get('/comanda', async (req, res) => {
    const comandas = await Comanda.find();
    res.json(comandas);
});

router.get('/comanda/add', async (req, res) => {
    const platos = await Plato.find();
    var tipos = Array.from(new Set(platos.map(plato => plato.tipo)));

    res.json({ platos, tipos });
});

router.post('/comanda', async (req, res) => {
    const { mesa, pedidos } = req.body;
    const total = await calcularTotal(pedidos);
    await new Comanda({mesa, pedidos, total}).save();
    res.json('Comanda Enviada.');
});

router.delete('/comanda/:id', async (req, res) => {
    await Comanda.findByIdAndDelete(req.params.id);
    res.json('Comanda Terminada.');
});

router.get('/plato', async (req, res) => {
    const platos = await Plato.find();
    res.json(platos);
});

router.post('/plato', async (req, res) => {
    await new Plato(req.body).save();
    res.json('Plato Agregado.');
});

router.delete('/plato/:id', async (req, res) => {
    await Plato.findByIdAndDelete(req.params.id);
    res.json('Plato Eliminado.');
});

router.get('/plato/:id', async (req, res) => {
    const plato = await Plato.findById(req.params.id);
    res.json(plato);
});



module.exports = router;