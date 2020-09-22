// Importing Loader system to load all requirements
require('./loader');

// Creating app with express
const app = express();

// Express configuration
app.use(session(session_options));
app.use(body_parser.urlencoded({extended : false}));
app.use(body_parser.json());

// Set the view engine
app.set('view engine', 'ejs');

// Defining Routes
const main = require('./main/main');

app.use('/', main);

// Listening on HTTP server
app.listen(config.app_port, ()=>{
    log(`------------------------------------------`);
    log(`Server created successfully (Address : ${app_url})\n`);
});
