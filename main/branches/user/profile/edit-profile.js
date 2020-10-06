const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {username_inp, email_inp, first_name_inp , last_name_inp, city_inp, day_inp, month_inp, year_inp, biography_inp,
            military_service_inp, marital_status_inp, sex_inp} = req.body;
        let contacts_type_inp = req.body['contacts_type_inp[]'];
        let contacts_link_inp = req.body['contacts_link_inp[]'];
        let date = `${year_inp}/${month_inp}/${day_inp}`
        let validation_result = new Validation([
            {value : username_inp, type : 'username'},
            {value : email_inp, type : 'email'},
            {value : first_name_inp},
            {value : last_name_inp},
            {value : city_inp},
            {value : date, type : 'date'},
            {value : biography_inp},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let profile_data = {
            username : username_inp,
            email : email_inp,
            first_name : first_name_inp,
            last_name : last_name_inp,
            city : city_inp,
            birth_date : jalali_date.toGregorian(parseInt(year_inp), parseInt(month_inp), parseInt(day_inp)),
            biography : biography_inp,
            military_service : parseInt(military_service_inp),
            marital_status : parseInt(marital_status_inp),
            sex : parseInt(sex_inp),
            contacts : []
        }

        for(let i = 0; i < contacts_type_inp.length; i++){

            let contact_list = {

                type : contacts_type_inp[i],
                link : contacts_link_inp[i],

            }

            profile_data.contacts.push(contact_list);

        }

        let result = await user_model.editProfile(req.session.user_info, profile_data);

        if(result){

            req.session.user_info = result;
            return res.json({'success' : 'success'});

        }
        else{

            return res.json('خطا در برقراری ارتباط با سرور.');

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
