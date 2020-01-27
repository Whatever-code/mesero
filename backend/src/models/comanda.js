const { Schema, model } = require('mongoose');

const comandaSchema = new Schema({
    mesa: Number,
    pedidos: Array,
    total: Number
});

module.exports = model('Comanda', comandaSchema);