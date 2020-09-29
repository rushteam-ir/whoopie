// Importing rout configuration
require('./main-init');

// Main rout middlewares
const Check_Login = require('./middlewares/check-login');
const Global_Info = require('./middlewares/global-info');
const Cache_Handler = require('./middlewares/cache-handler');

main.use(Check_Login);
main.use(Global_Info);
main.use(Cache_Handler);

// Main rout branches
const Api = require('./api/api');
const Index = require('./branches/index/index');
const Profile = require('./branches/profile/profile');
const New = require('./branches/new/new');
const Edit = require('./branches/edit/edit');
const List = require('./branches/list/list');

main.use('/api', Api);
main.use('/', Index);
main.use('/profile', Profile);
main.use('/new', New);
main.use('/edit', Edit);
main.use('/list', List);

// Handle main rout 404 error
main.use(async (req, res, next)=>{

    res.status(404).render('errors/404');

});

// Handle main rout 500 error
main.use(async (error, req, res, next)=>{

    let report_data = {
        type : '500',
        text : error,
        url : req._parsedOriginalUrl.path,
        who : req.session.user_info,
        user_agent : req.headers['user-agent'],
        remote_address : req.connection.remoteAddress,
    }

    await report_model.add(report_data);

    res.status(500).render('errors/500', {error});

});

// Exporting main rout module
module.exports = main;
