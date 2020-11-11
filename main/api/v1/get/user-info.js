const router = express.Router();

router.get('/:username', async(req, res, next)=>{

    try{

        let {username} = req.params;
        let find_user = await user_model.getByUserName(username);

        if(find_user){

            if(!find_user.confirm_profile){

                return await res.json({
                    username : username,
                    code : 201,
                    error : "user not completed profile yet."
                })

            }

            let city_list = main_city_list;
            let find_ads = await ad_model.getByQuery({author : find_user._id});
            let user_ads = [];

            for(let ad of find_ads){

                user_ads.push({id : ad.unique_id});

            }

            let user_info = {
                first_name : find_user.first_name,
                last_name : find_user.last_name,
                username : find_user.username,
                biography : find_user.biography,
                avatar_link : `${app_url}media/avatars/${find_user.avatar}`,
                birth_date : `${find_user.birth_year}/${find_user.birth_month}/${find_user.birth_day}`,
                city : find_user.city == '0' ? null : city_list[parseInt(find_user.city)],
                marital_status: find_user.marital_status == '0' ? null : main_marital_list[parseInt(find_user.marital_status)],
                military_status: find_user.sex == '0' ? null : (find_user.military_status == '0' ? null : main_military_list[parseInt(find_user.military_status)]),
                sex: find_user.sex == '0' ? null : main_sex_list[parseInt(find_user.sex)],
                ads : user_ads,
                contact : {
                    email: find_user.contact_email ? find_user.email : null,
                    instagram: find_user.contact_instagram ? find_user.contact_instagram_id : null,
                    phone: find_user.contact_phone ? find_user.phone_number : null,
                    telegram: find_user.contact_telegram ? (find_user.contact_telegram_type == '0' ? find_user.phone_number : '@'+ find_user.contact_telegram_id) : null,
                    whatsapp : find_user.contact_whatsapp ? find_user.phone_number : null,
                }
            }

            await res.json(user_info);

        }
        else{

            await res.json({
                username : username,
                code : 202,
                error : "user not found."
            })

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;