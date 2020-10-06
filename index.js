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
// const expressValidator = require('express-validator');
// const flash = require('connect-flash');
// const createError = require('http-errors');
// const passport = require('./config/passport');

const router = require('./routes');

require('dotenv').config({ path : 'variables.env'});

const app = express();

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

app.use('/', router())

app.listen(process.env.PUERTO);