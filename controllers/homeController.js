const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

exports.mostrarTrabajos = async (req, res, next) => {

  const vacantesSinFiltrar = await Vacante.find();

  let vacantes = []
  vacantesSinFiltrar.forEach( vacante => {
    if (vacante.deleted === false) {
      vacantes.push(vacante);
    }
  });
  
  if (!vacantesSinFiltrar) return next();

  res.render('home', {
    nombrePagina: 'devJobs',
    tagline: 'Encuentra y Pública Trabajos para el Ámbito Tecnológico en Catamarca',
    tagline2: 'Si eres Reclutador puedes ingresar al Panel de Administracion desde desde',
    barra: true,
    boton: true,
    vacantes,
  })
}