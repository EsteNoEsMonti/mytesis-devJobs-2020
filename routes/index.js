const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const vacantesController = require('../controllers/vacantesController');
const usuariosController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');

module.exports = () => {
  router.get('/', homeController.mostrarTrabajos);

  // Crear Vacantes
  router.get('/vacantes/nueva',
    authController.verificarUsuario,
    vacantesController.formularioNuevaVacante
  );
  router.post('/vacantes/nueva',
    authController.verificarUsuario,
    // vacantesController.validarVacante,
    vacantesController.agregarVacante
  );

  // Mostrar Vacante (singular)
  router.get('/vacantes/:url', vacantesController.mostrarVacante);

  //editar vacantes
  router.get('/vacantes/editar/:url',
    authController.verificarUsuario,
    vacantesController.formEditarVacante
  );

  router.post('/vacantes/editar/:url',
    authController.verificarUsuario,
    // vacantesController.validarVacante,
    vacantesController.editarVacante
  );

  // //eliminar vacantes
  // router.delete('/vacantes/eliminar/:id',
  //   vacantesController.eliminarVacante
  // );

  //crear cuentas
  router.get('/crear-cuenta',
    usuariosController.formCrearCuenta
  );

  router.post('/crear-cuenta',
    usuariosController.validarRegistro,
    usuariosController.crearUsuario
  );

  // //Resetear password(emails)
  // router.get('/reestablecer-password',
  //   authController.formReestablecerPassword
  // );
  // router.post('/reestablecer-password',
  //   authController.enviarToken
  // );

  // router.get('/reestablecer-password/:token',
  //   authController.reestablecerPassword
  // );

  // router.post('/reestablecer-password/:token',
  //   authController.guardarPassword
  // );

  //authenticar usuarios
  router.get('/iniciar-sesion',
    usuariosController.formIniciarSesion
  );
  router.post('/iniciar-sesion',
    authController.autenticarUsuario
  );

  // //cerrar sesion
  // router.get('/cerrar-sesion',
  //   authController.cerrarSesion
  // );

  //panel de administracion
  router.get('/administracion',
    authController.verificarUsuario,
    authController.mostrarPanel
  );

  // router.post('/iniciar-sesion', authController.autenticarUsuario);

  // router.get('/editar-perfil',
  //   authController.verificarUsuario,
  //   usuariosController.formEditarPerfil
  // );

  // router.post('/editar-perfil',
  //   authController.verificarUsuario,
  //   // usuariosController.validarPerfil,
  //   usuariosController.subirImagen,
  //   usuariosController.editarPerfil
  // );

  // //Recibir mensajes de candidators

  // router.post('/vacantes/:url',
  //   vacantesController.subirCV,
  //   vacantesController.contactar,
  // );

  // router.get('/candidatos/:id',
  //   authController.verificarUsuario,
  //   vacantesController.mostrarCandidatos
  // );

  // //Buscador de vacantes
  // router.post('/buscador',
  //   vacantesController.buscarVacantes
  // );

  return router;
}