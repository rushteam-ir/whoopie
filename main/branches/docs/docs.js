const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('docs/docs');

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
