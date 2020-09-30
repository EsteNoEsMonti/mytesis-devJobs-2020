const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
// const usuariosController = require('../controllers/usuariosController');
// const authController = require('../controllers/authController');

module.exports = () => {
  router.get('/', homeController.mostrarTrabajos);

  // Crear Vacantes
  router.get('/vacantes/nueva',
    // authController.verificarUsuario,
    vacantesController.formularioNuevaVacante
  );
  router.post('/vacantes/nueva',
    // authController.verificarUsuario,
    // vacantesController.validarVacante,
    vacantesController.agregarVacante
  );

  return router;
}