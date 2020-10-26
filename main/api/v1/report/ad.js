const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {report_type_inp, text_inp, ad_id_inp} = req.body;

        let validation_result = new Validation([
            {value : ad_id_inp},
            {value : report_type_inp, type : 'number'},
            {value : text_inp},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let report_data = {
            type : report_type_inp,
            text : text_inp,
            who : req.session.user_info,
            user_agent : req.headers['user-agent'],
            remote_address : req.connection.remoteAddress,
        }

        let result = await report_model.addAd(ad_id_inp, report_data);

        if(result){

            return res.json({
                status : "success",
                msg : "",
                url : `${app_url}?w=${ad_id_inp}`
            });

        }
        else{

            return res.json('درخواست شما با خطا مواجه شده است.');

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;

