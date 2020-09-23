const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {username_inp, password_inp, confirm_password_inp} = req.body;
        let validation_result = new Validation([
            {value : username_inp, type : 'username'},
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
            password : password_inp
        }

        let result = await user_model.register(register_data);

        if(result){

            return res.json({success : 'success'});

        }
        else{

            return res.json({fail : 'fail'});

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
