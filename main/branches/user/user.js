const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        res.redirect(`${app_url}user/profile`);

    }
    catch (error) {

        next(error);

    }

});

const profile = require('./profile/profile');
const password = require('./password/password');

router.use('/profile', profile);
router.use('/password', password);

module.exports = router;
