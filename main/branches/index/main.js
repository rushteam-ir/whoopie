const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let {s, w} = req.query;

        if(!isUndefined(s)){

            // Search
            await require('./search')(req, res, next);

        }
        else if(!isUndefined(w)){

            // Watch an Ad
            await require('./watch')(req, res, next);

        }
        else{

            // Default page
            let data = {
                category_list : await category_model.getAll()
            }

            return res.render('index/main', data);

        }

    }
    catch (error) {

        next(error);

    }

});

const profile = require('../profile/profile');

router.use('/', profile);

module.exports = router;
