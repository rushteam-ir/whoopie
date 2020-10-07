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
const change_avatar = require('./change-avatar');
const delete_avatar = require('./delete-avatar');

router.use('/edit-profile', edit_profile);
router.use('/change-avatar', change_avatar);
router.use('/delete-avatar', delete_avatar);

module.exports = router;
