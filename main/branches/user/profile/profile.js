const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            user_info : req.session.user_info
        }

        res.render('user/profile', data);

    }
    catch (error) {

        next(error);

    }

});

const edit_profile = require('./edit-profile');

router.use('/edit-profile', edit_profile);

module.exports = router;
