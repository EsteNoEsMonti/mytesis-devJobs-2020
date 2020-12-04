const emailConfig = require('../config/email');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const util = require('util'); // va a ser necesario para hacer el callback de cuando se llama al email

let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass
  }
})

// Utilizar templates de Handlebars
transport.use('compile', hbs({
  viewEngine: {
    extName: 'handlebars',
    partialsDir: __dirname + '/../views/emails',
    layoutsDir: __dirname + '/../views/emails',
    defaultLayout: 'nuevomail.handlebars'
  },
  viewPath: __dirname + '/../views/emails', //onde tan las vistas
  extName: '.handlebars'
}));

exports.enviar = async (opciones) => {
  const opcionesEmail = {
    from: 'devjobs<noreply@devjobs.com>', // para que no respondan al correo xd 
    to: opciones.email,
    subject: opciones.subject,
    template: opciones.archivo,
    context: { // todo lo que ponga en el context lo puedo usar dentro del template
      vacanteUrl: opciones.vacanteUrl
    }
  }

  const sendMail = util.promisify(transport.sendMail, transport);
  return sendMail.call(transport, opcionesEmail);
}