// Importing npm or system modules
express = require('express');
mongoose = require('mongoose');
session = require('express-session');
body_parser = require('body-parser');
mongo_store = require('connect-mongo')(session);

// Importing other modules
require('./library');
require('./init');

// Importing database models
