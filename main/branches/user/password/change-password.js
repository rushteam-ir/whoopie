const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {current_password_inp, new_password_inp, confirm_password_inp} = req.body;
        let validation_result = new Validation([
            {value : current_password_inp, type : 'password'},
            {value : new_password_inp, type : 'password'},
            {value : confirm_password_inp, type : 'password'},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }
        else if(new_password_inp !== confirm_password_inp){

            return res.json('رمز عبور و تکرار آن مشابه نیستند.');

        }

        let password_data = {
            current_password : current_password_inp,
            new_password : new_password_inp
        }

        let result = await user_model.changePassword(req.session.user_info, password_data);

        if(result){

            req.session.user_info = result;
            return res.json({'success' : 'success'});

        }
        else{

            return res.json({'fail' : 'fail'});

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
