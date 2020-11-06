const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {token_inp} = req.body;
        await analyse_model.add({token : token_inp});
        req.session.token = token_inp;
        res.end();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;

