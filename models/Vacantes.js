const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');
const shortid = require('shortid');
const mongoose_delete = require('mongoose-delete');

const vacantesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: 'El nombre de la vacante es obligatorio',
    trim: true
  },
  empresa: {
    type: String,
    trim: true
  },
  ubicacion: {
    type: String,
    trim: true,
    required: 'La ubicación es obligatoria'
  },
  salario: {
    type: String,
    default: 0,
    trim: true,
  },
  contrato: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  url: {
    type: String,
    lowercase: true
  },
  skills: [String],
  candidatos: [{
    nombre: String,
    email: String,
    cv: String
  }],
  autor: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuarios',
    required: 'El autor es obligatorio'
  },
  deleted: {
    type: Boolean,
    default: false
  },
  creada: {
    type: Date,
    default: Date.now
  }
});

vacantesSchema.pre('save', function (next) {

  // crear la url
  const url = slug(this.titulo);
  this.url = `${url}-${shortid.generate()}`;

  next();
})

// Crear un indice
vacantesSchema.index({ titulo: 'text' });

// CREO QUE Agregar plugin soft-deleted
vacantesSchema.plugin(mongoose_delete, { deletedAt : true }); // creo que ya estaría implementado el plugin


module.exports = mongoose.model('Vacante', vacantesSchema);