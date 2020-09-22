// Importing rout configuration
require('./main-init');

// Main rout middlewares


// Main rout branches
const index = require('./branches/index/index');

main.use('/', index);

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
