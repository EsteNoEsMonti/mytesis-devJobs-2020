const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.mostrarTrabajos = async (req, res, next) => {

  const vacantes = await Vacante.find();

  if (!vacantes) return next();

  res.render('home', {
    // nombrePagina: 'devJobs',
    nombrePagina: 'devJobs',
    tagline: 'Encuentra y Pública Trabajos para el Ámbito Tecnológico en Catamarca',
    tagline2: 'Si eres Reclutador puedes ingresar al Panel de Administracion desde desde',
    barra: true,
    boton: true,
    vacantes,
    // enlaces: true //new
  })
}