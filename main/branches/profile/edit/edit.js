const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let username = req.username;

        if(req.session.user_info){

            if(username == req.session.user_info.username){

                let data = {
                    user_info : req.session.user_info
                }

                res.render('profile/edit', data);

            }
            else{

                res.render('errors/404');

            }

        }
        else{

            res.render('errors/404');

        }

    }
    catch (error) {

        next(error);

    }

});

const edit_profile = require('./edit-profile');

router.use('/edit-profile', edit_profile);

module.exports = router;
