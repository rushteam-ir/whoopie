// Start execute timer
console.time('Execute Time');

// Importing Loader system to load all requirements
require('./loader');

// Creating app with express
const app = express();

// Express configuration
//app.use(compression());
app.use(session(session_options));
app.use(body_parser.urlencoded({extended : false}));
app.use(body_parser.json());
app.use(file_upload());

// Set the view engine
app.engine('dust', adaro.dust(dust_helpers))
app.set('view engine', 'dust');

// Defining Routes
const Main = require('./main/main');

app.use('/', Main);

// Listening on HTTP server
app.listen(config.app_port, ()=>{
    log(`------------------------------------------------------------------`);
    log(`Server created successfully (Address: ${app_url})`);
    console.timeEnd('Execute Time');
    log(`------------------------------------------------------------------`);
});
