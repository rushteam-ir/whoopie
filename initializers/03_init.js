// Importing configuration
config = require('../config.json');

// Defining global variables
app_url = `http://${config.app_address}:${config.app_port}/`;
app_dir = require.main.path + '/';
db_url = `mongodb://localhost:${config.db_port}/${config.db_name}`;

// Connect MongoDB with options below
mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify : false,
    useCreateIndex : true
});

// Session configuration
session_options = {
    store : new mongo_store({url : db_url}),
    secret: config.session_secret,
    name : config.session_name,
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: config.cookie_age}
};

