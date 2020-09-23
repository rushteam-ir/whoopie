const router = express.Router();

router.post('/', async(req, res, next)=>{

    let {username_inp, password_inp, confirm_password_inp} = req.body;

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

});

module.exports = router;
