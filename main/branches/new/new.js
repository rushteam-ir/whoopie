const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.render('new/new');

    }
    catch (error) {

        next(error);

    }

});

const add_advertising = require('./add-advertising');

router.use('/add-advertising', add_advertising);

module.exports = router;
