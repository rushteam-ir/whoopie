const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {token_inp} = req.body;
        let token_model = {
            _id : token_inp,
            user_agent : req.headers['user-agent'],
            remote_address : req.connection.remoteAddress,
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