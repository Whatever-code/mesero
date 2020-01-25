const { Schema, model } = require('mongoose');

const platoSchema = new Schema({
    nombre: {type:String, unique: true},
    precio: Number,
    tipo: String
});

module.exports = model('Plato', platoSchema);