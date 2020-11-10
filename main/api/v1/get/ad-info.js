const router = express.Router();

router.get('/:ad_id', async(req, res, next)=>{

    try{

        let {ad_id} = req.params;
        let find_ad = await ad_model.getByQuery({unique_id : ad_id});

        if(!isUndefined(find_ad[0])){

            await ad_model.addRepByWatch(ad_id, req.session.token);

            let city_list = main_city_list;
            let ad_info = {
                id : find_ad[0].unique_id,
                title : find_ad[0].title,
                summary : find_ad[0].summary,
                category : find_ad[0].category.title,
                describe : find_ad[0].describe,
                tags : find_ad[0].tags,
                portfolio_link : find_ad[0].portfolio != '' ?`${app_url}api/v1/download/${find_ad[0].unique_id}/${find_ad[0].portfolio}` : null,
                type : find_ad[0].type == '0' ? 'حضوری' : 'دورکاری',
                created_date : find_ad[0].created_date,
                author : {
                    first_name : find_ad[0].author.first_name,
                    last_name : find_ad[0].author.last_name,
                    username : find_ad[0].author.username,
                    biography : find_ad[0].author.biography,
                    avatar_link : `${app_url}media/avatars/${find_ad[0].author.avatar}`,
                    birth_date : `${find_ad[0].author.birth_year}/${find_ad[0].author.birth_month}/${find_ad[0].author.birth_day}`,
                    city : find_ad[0].author.city == '0' ? null : city_list[parseInt(find_ad[0].author.city)],
                    marital_status: find_ad[0].author.marital_status == '0' ? null : main_marital_list[parseInt(find_ad[0].author.marital_status)],
                    military_status: find_ad[0].author.sex == '0' ? null : (find_ad[0].author.military_status == '0' ? null : main_military_list[parseInt(find_ad[0].author.military_status)]),
                    sex: find_ad[0].author.sex == '0' ? null : main_sex_list[parseInt(find_ad[0].author.sex)],
                    contact : {
                        email: find_ad[0].author.contact_email ? find_ad[0].author.email : null,
                        instagram: find_ad[0].author.contact_instagram ? find_ad[0].author.contact_instagram_id : null,
                        phone: find_ad[0].author.contact_phone ? find_ad[0].author.phone_number : null,
                        telegram: find_ad[0].author.contact_telegram ? (find_ad[0].author.contact_telegram_type == '0' ? find_ad[0].author.phone_number : '@'+ find_ad[0].author.contact_telegram_id) : null,
                        whatsapp : find_ad[0].author.contact_whatsapp ? find_ad[0].author.phone_number : null,
                    }
                },
            };

            await res.json(ad_info)

        }
        else{

            await res.json({
                id : ad_id,
                error : "ad not found."
            })

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;