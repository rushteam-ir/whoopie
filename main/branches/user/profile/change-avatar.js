const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        if (!req.files || Object.keys(req.files).length === 0) {

            return res.json('لطفا یک عکس انتخاب کنید.');

        }

        let avatar = req.files.avatar_inp;
        let file_name = `${randomSha1String()}.${avatar.name.split(".").pop()}`;

        if(avatar.size/(1024*1024) <= image_limited_size){

            await avatar.mv(`${app_dir}main/templates/whoopieV1/assets/media/avatars/${file_name}`, async(err)=>{

                if(err){

                    next(err);

                }
                else{

                    let avatar_info = {
                        avatar : file_name
                    }
                    let result = await user_model.editProfile(req.session.user_info, avatar_info);

                    if(result){

                        req.session.user_info = result;
                        return res.json({'success' : 'success'});

                    }
                    else{

                        return res.json('در تعویض تصویر مشکلی پیش آمده است.');

                    }

                }

            });

        }
        else{

            return res.json(`حداکثر حجم مجاز برای آپلود تصویر ${image_limited_size} مگابایت می باشد.`);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
