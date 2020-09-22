// Initiating Rout
const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        log()
        res.render('index/index');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
