const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {first_name_inp, last_name_inp, username_inp, email_inp, phone_number_inp, sex_inp, military_service_inp,
            marital_status_inp, city_inp, biography_inp, day_inp, month_inp, year_inp, c_contact_phone_number_inp,
            c_contact_email_inp, c_contact_whatsapp_inp, c_contact_instagram_inp, c_contact_telegram_inp,
            c_telegram_type_inp, contact_telegram_inp, contact_instagram_inp} = req.body;
        let date = `${year_inp}/${month_inp}/${day_inp}`
        let validation_result = new Validation([
            {value : first_name_inp, type : 'name'},
            {value : last_name_inp, type : 'name'},
            {value : username_inp, type : 'username'},
            {value : email_inp, type : 'email'},
            {value : phone_number_inp, type : 'phone'},
            {value : sex_inp, type : 'number'},
            {value : marital_status_inp, type : 'number'},
            {value : city_inp, type : 'number'},
            {value : biography_inp, type : 'biography'},
            {value : day_inp, type : 'number'},
            {value : month_inp, type : 'number'},
            {value : year_inp, type : 'number'},
            {value : date, type : 'date'},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        if(sex_inp == '0'){

            let military_validation_result = new Validation([
                {value : military_service_inp, type : 'number'},
            ]).check();

            if(military_validation_result){

                return res.json(military_validation_result);

            }

        }
        if(isUndefined(c_contact_phone_number_inp) && isUndefined(c_contact_email_inp) &&
           isUndefined(c_contact_whatsapp_inp) && isUndefined(c_contact_instagram_inp) && isUndefined(c_contact_telegram_inp)){

            return res.json('حداقل یک راه ارتباطی باید انتخاب نمایید.')

        }
        if(c_contact_telegram_inp == 'on'){

            if(isUndefined(c_telegram_type_inp)){

                return res.json('لطفا یک گزینه ارتباطی برای تلگرام انتخاب کنید.');

            }
            else if(c_telegram_type_inp == '1'){

                let telegram_validation_result = new Validation([
                    {value : contact_telegram_inp, type : 'telegram'},
                ]).check();

                if(telegram_validation_result){

                    return res.json(telegram_validation_result);

                }

            }

        }

        if(c_contact_instagram_inp == 'on'){

            let instagram_validation_result = new Validation([
                {value : contact_instagram_inp, type : 'instagram'},
            ]).check();

            if(instagram_validation_result){

                return res.json(instagram_validation_result);

            }

        }

        let profile_data = {
            first_name : first_name_inp,
            last_name : last_name_inp,
            username : username_inp,
            email : email_inp,
            phone_number : phone_number_inp,
            sex : sex_inp,
            military_status : military_service_inp,
            marital_status : marital_status_inp,
            city : city_inp,
            biography : biography_inp,
            birth_day : day_inp,
            birth_month : month_inp,
            birth_year : year_inp,
            contact_phone : c_contact_phone_number_inp == 'on' ? true : false,
            contact_email : c_contact_email_inp == 'on' ? true : false,
            contact_whatsapp : c_contact_whatsapp_inp == 'on' ? true : false,
            contact_instagram : c_contact_instagram_inp == 'on' ? true : false,
            contact_telegram : c_contact_telegram_inp == 'on' ? true : false,
            contact_telegram_type : c_telegram_type_inp,
            contact_telegram_id : contact_telegram_inp,
            contact_instagram_id : contact_instagram_inp,
        }

        let result = await user_model.editProfile(req.session.user_info, profile_data);

        if(typeof result != 'string'){

            req.session.user_info = result;
            return res.json({
                status : 'success',
                msg : 'اطلاعات کاربری با موفقیت ویرایش شد.',
                url : `${app_url}user/profile`
            });

        }
        else{

            return res.json(result);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
