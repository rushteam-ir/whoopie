// Importing rout configuration
require('./main-init');

// Main rout middlewares
const check_login = require('./middlewares/check-login');

main.use(check_login);

// Main rout branches
const api = require('./api/api');
const index = require('./branches/index/index');
const profile = require('./branches/profile/profile');

main.use('/api', api);
main.use('/', index);
main.use('/profile', profile);

// Handle main rout 404 error
main.use(async (req, res, next)=>{

    res.status(404).render('errors/404');

});

// Handle main rout 500 error
main.use(async (error, req, res, next)=>{

    res.status(500).render('errors/500', {error});

});

// Exporting main rout module
module.exports = main;
