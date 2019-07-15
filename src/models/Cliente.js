const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cliente = new Schema({
    cliente: String,
    edificio: String,
    direccion: String,
    lectura: String,
    fechainstalacion: String
});

module.exports = mongoose.model('Cliente', Cliente);