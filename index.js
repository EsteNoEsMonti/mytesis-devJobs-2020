const mongoose = require('mongoose');
require('./config/db');

const express = require('express');
// New Handlebars
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
//---
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const createError = require('http-errors');
const passport = require('./config/passport');

const router = require('./routes');

require('dotenv').config({ path : 'variables.env'});

const app = express();

//express validator
app.use(expressValidator());

// habilitar body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// habilitar handlebars como view
app.engine('handlebars',
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        defaultLayout: 'layout',
        helpers: require('./helpers/handlebars')
    })
);
// app.engine('handlebars',
//   exphbs({
//     andlebars: allowInsecurePrototypeAccess(handlebars),
//     defaultLayout: 'layout',
//     helpers: require('./helpers/handlebars') // Los Helpers son una forma en la que registras
//                                             // registras scripts para que se comuniquen
//                                            // directamente con handlebars antes de su salida
//                                           // y eso es lo que se está haciendo par mostrar las skills.
//   })
// );
app.set('view engine', 'handlebars');

// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection : mongoose.connection })
}));

// inicializar passport
app.use(passport.initialize());
app.use(passport.session());

// Alertas y flash messages
app.use(flash());

// Crear nuestro middleware (va a guardar los mensajes y que usuario)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    next();
});

app.use('/', router());

// 404 pagina no existente
app.use((req, res, next) => {
    next(createError(404, 'No Encontrado'));
})

// Administración de los errores
app.use((error, req, res, next) => { // 1er parametro si hay un error tiene que ser el error
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ',error.message); 
    res.locals.mensaje = error.message;
    const status = error.status || 500;
    res.locals.status = status;
    res.status(status);
    res.render('error');
});

app.listen(process.env.PUERTO);