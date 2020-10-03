const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {ad_inp, text_inp} = req.body;
        let validation_result = new Validation([
            {value : ad_inp},
            {value : text_inp},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let report_data = {
            type : `Ad`,
            text : text_inp,
            url : req._parsedOriginalUrl.path,
            who : req.session.user_info,
            user_agent : req.headers['user-agent'],
            remote_address : req.connection.remoteAddress,
        }

        let result = await report_model.addAd(ad_inp, report_data);

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

