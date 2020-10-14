const router = express.Router();

router.get('/@:username', async(req, res, next)=>{

    let username = req.params.username;
    let user_info = await user_model.getByUserName(username);

    if(user_info){

        let data = {
            user_info : user_info,
            ads_list : await ad_model.getByUserName({author : user_info._id})
        }

        return res.render('profile/profile', data);

    }
    else{

        return res.status(404).render('errors/404');

    }

});

const edit = require('./edit/edit');
const password = require('./password/password');

router.use('/@:username/edit', async(req, res, next)=>{
    req.username = req.params.username;
    next();
}, edit);

router.use('/@:username/password', async(req, res, next)=>{
    req.username = req.params.username;
    next();
}, password);

module.exports = router;

