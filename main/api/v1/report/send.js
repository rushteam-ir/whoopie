const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        log(req.body)
        log('aaassdfsdf')
        let {report_type_inp, text_inp, model_id_inp} = req.body;
        let back_url = req.header('Referer') || '/';
        let full_url = req.protocol + '://' + req.get('host') + req.originalUrl;

        let report_data = {
            type : report_type_inp,
            text : text_inp,
            model_id : model_id_inp,
            token : req.session.token,
            url : full_url
        }

        let result = await report_model.add(report_data);

        if(result){

            return res.json({
                status : "success",
                msg : "",
                url : back_url
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

