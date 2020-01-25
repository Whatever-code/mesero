const { Schema, model } = require('mongoose');

const comandaSchema = new Schema({
    mesa: Number,
    pedidos: Array,
});

module.exports = model('Comanda', comandaSchema);