const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {username_inp, email_inp, first_name_inp , last_name_inp, city_inp, day_inp, month_inp, year_inp, biography_inp} = req.body;
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
            biography : biography_inp
        }

        let result = await user_model.editProfile(req.session.user_info, profile_data);

        if(result){

            req.session.user_info = result;
            return res.json({'success' : 'success'});

        }
        else{

            return res.json('خطلا در برقراری با سرور.');

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
