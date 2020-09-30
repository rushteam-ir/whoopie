const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        if(isUndefined(req.session.user_info)) {

            let {username_inp, email_inp, password_inp, confirm_password_inp} = req.body;
            let validation_result = new Validation([
                {value : username_inp, type : 'username'},
                {value : email_inp, type : 'email'},
                {value : password_inp, type : 'password'},
                {value : confirm_password_inp, type : 'password'},
            ]).check();

            if(validation_result){

                return res.json(validation_result);

            }
            else if(password_inp !== confirm_password_inp){

                return res.json('رمز عبور و تکرار آن مشابه نیستند.');

            }

            let register_data = {
                username : username_inp,
                email : email_inp,
                password : password_inp
            }

            let result = await user_model.register(register_data);

            if(result){

                req.session.user_info = result;
                return res.json({success : 'success'});

            }
            else{

                return res.json({fail : 'fail'});

            }

        }
        else{

            return res.end();

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
