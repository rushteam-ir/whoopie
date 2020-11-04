const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let data = {
            ad_list_info : await ad_model.getByQuery({author : req.session.user_info})
        }

        res.render('list/list', data);

    }
    catch (error) {

        next(error);

    }

});

const delete_ad = require('./delete-ad');

router.use('/delete-ad', delete_ad);

module.exports = router;
