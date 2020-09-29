const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {username_inp, password_inp} = req.body;
        let validation_result = new Validation([
            {value : username_inp, type : 'username'},
            {value : password_inp, type : 'password'},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let login_data = {
            username : username_inp,
            password : password_inp
        }

        let result = await user_model.login(login_data);

        log(result)

        if(result){

            req.session.user_info = result;
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
