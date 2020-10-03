const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {text_inp} = req.body;
        let validation_result = new Validation([
            {value : text_inp},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let report_data = {
            type : 'General',
            text : text_inp,
            url : req._parsedOriginalUrl.path,
            who : req.session.user_info,
            user_agent : req.headers['user-agent'],
            remote_address : req.connection.remoteAddress,
        }

        let result = await report_model.addGeneral(report_data);

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

