const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            user_info : await user_model.getById(req.session.user_info)
        }

        res.render('profile/profile', data);

    }
    catch (error) {

        next(error);

    }

});

const edit_profile = require('./edit-profile');
const change_password = require('./change-password');
const change_avatar = require('./change-avatar');

router.use('/edit-profile', edit_profile);
router.use('/change-password', change_password);
router.use('/change-avatar', change_avatar);

module.exports = router;
