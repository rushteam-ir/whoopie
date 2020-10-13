const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        if(isUndefined(req.session.user_info)){

            let {username_or_email_inp, password_inp} = req.body;
            let validation_result = new Validation([
                {value : username_or_email_inp},
                {value : password_inp, type : 'password'},
            ]).check();

            if(validation_result){

                return res.json(validation_result);

            }

            let login_data = {
                username_or_email : username_or_email_inp,
                password : password_inp
            }

            let result = await user_model.login(login_data);

            if(result){

                req.session.user_info = result;
                return res.json({
                    status : 'success',
                    msg : '',
                    url : `${app_url}`
                });

            }
            else{

                return res.json('اطلاعات ورود نادرست می باشد.');

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
