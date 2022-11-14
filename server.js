const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { strict } = require('assert');

const sequelize = require('./config/connection');  // contains the DB connection setup
const clog = require('./middleware/clog'); // logs every HTTP request with a timestamp to console
const {apiDaemon, apiCleanupDaemon} = require('./utils/apiDaemon'); // logs every HTTP request with a timestamp to console
const routes = require('./controllers');  // all routes get intercepted there
const {formatDate, isEqual} = require('./utils/helpers');  // all routes get intercepted there

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session and connect to our Sequelize db
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sess));

// Sets up handlebars.js and registers view engine
app.engine('hbs', exphbs(      // give the handlebars engine a name
  {
    defaultLayout: 'main',     // set the default layout ot be main.hbs
    extname: '.hbs',           // set the extensions to end in hbs instead of handlebars
    helpers: {
      formatDate,
      isEqual
    }
  }
));
app.set('view engine', 'hbs'); // set the view engine to be hbs

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(clog);
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, ()=>{
    // apiDaemon();
    // apiCleanupDaemon();
    console.log(`Server has started... Listening on http://localhost:${PORT}/`);
    console.log('Time:', Intl.DateTimeFormat('en-US',{dateStyle: 'long', timeStyle: 'long'}).format(new Date()));
  })
});




