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

router.get('/@:username', async(req, res, next)=>{

    try{

        let username = req.params.username;
        let user_info = await user_model.getByUserName(username);

        if(user_info){

            let data = {
                user_info : user_info
            }

            return res.render('index/profile', user_info);

        }
        else{

            return res.status(404).render('errors/404');

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
