const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {token_inp} = req.body;
        let agent_os = useragent.parse(req.headers['user-agent']).os.family;
        let agent_browser = Object.keys(useragent.is(req.headers['user-agent'])).find(key => useragent.is(req.headers['user-agent'])[key] === true);
        let token_model = {
            _id : token_inp,
            user_agent : req.headers['user-agent'],
            remote_address : req.connection.remoteAddress,
            os : agent_os,
            browser : agent_browser
        }

        await analyse_model.add(token_model);

        req.session.token = token_inp;
        res.end();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;