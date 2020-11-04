// Importing npm or system modules
express = require('express');
path = require('path');
adaro = require('adaro');
mongoose = require('mongoose');
session = require('express-session');
body_parser = require('body-parser');
mongo_store = require('connect-mongo')(session);
bcrypt = require('bcrypt');
file_upload = require('express-fileupload');
sha1 = require('sha1');
jalali_date = require('jalali-date');
rsuid = require('rsuid');
helmet = require('helmet');
compression = require('compression');
string_similarity = require('string-similarity');
