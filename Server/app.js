require('dotenv').config();

const bodyParser   = require('body-parser'),
      cookieParser = require('cookie-parser'),
      express      = require('express'),
      favicon      = require('serve-favicon'),

      mongoose     = require('mongoose'),
      logger       = require('morgan'),
      path         = require('path'),

      session    = require('express-session'),
      MongoStore = require('connect-mongo')(session),
      flash      = require('connect-flash'),
      cors       = require('cors');
      
  //  const { loginRequired, ensureCorrectUser } = require('./middleware/auth');


mongoose
  .connect('mongodb://localhost/Server', { useNewUrlParser: true })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err);
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true,
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));


// default value for title local
app.locals.title = 'Welcome To [vital]ity';


// Enable authentication using session + passport
app.use(session({
  secret: 'vitality',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(flash());
require('./passport')(app);

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'],
}));


const index = require('./routes/index');

app.use('/', index);

const authRoutes = require('./routes/auth');

app.use('/auth', authRoutes);


const caseRoutes = require('./routes/case');

app.use('/cases', caseRoutes);

const commentRoutes = require('./routes/comment');

app.use('/comments', commentRoutes);

const messageRoutes = require('./routes/messages');

// app.use('/community', loginRequired,ensureCorrectUser, messageRoutes);

app.use(
  '/community/:id/messages',
  messageRoutes
);

app.use((req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});
module.exports = app;
