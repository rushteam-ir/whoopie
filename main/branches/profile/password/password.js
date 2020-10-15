const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let username = req.username;

        if(req.session.user_info){

            if(username == req.session.user_info.username) {

                let data = {
                    user_info : await user_model.getById(req.session.user_info)
                }

                res.render('profile/password', data);

            }
            else{

                res.render('errors/404')

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

const change_password = require('./change-password');

router.use('/change-password', change_password);

module.exports = router;
