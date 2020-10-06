const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            user_info : await user_model.getById(req.session.user_info)
        }

        res.render('user/password', data);

    }
    catch (error) {

        next(error);

    }

});

const change_password = require('./change-password');

router.use('/change-password', change_password);

module.exports = router;
