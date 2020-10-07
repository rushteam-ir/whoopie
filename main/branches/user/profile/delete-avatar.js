const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        await fs.unlink(`${app_dir}main/templates/whoopieV1/assets/media/avatars/${req.session.user_info.avatar}`, async(err) => {

            if (err) {

                let avatar_info = {
                    avatar : ''
                }

                let result = await user_model.editProfile(req.session.user_info, avatar_info);
                req.session.user_info = result;

                return res.redirect(`${app_url}user/profile`)

            }
            else{

                let avatar_info = {
                    avatar : ''
                }
                let result = await user_model.editProfile(req.session.user_info, avatar_info);

                if(result){

                    req.session.user_info = result;
                    return res.json('تصویر پروفایل با موفقیت حذف شد.');

                }
                else{

                    return res.json('حذف تصویر با خطا مواجه شد.')

                }

            }

        });

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
