const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        log(req.body)
        let {title_inp, summary_inp, category_inp, describe_inp, type_inp} = req.body;
        let tags_inp = req.body['tags_inp[]'];
        let validation_result = new Validation([
            {value : title_inp, type : 'empty'},
            {value : summary_inp, type : 'empty'},
            {value : category_inp, type : 'number'},
            {value : describe_inp, type : 'empty'},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let ad_data = {
            title : title_inp,
            summary : summary_inp,
            category : (category_inp === '0') ? null : category_inp,
            describe : describe_inp,
            tags : tags_inp,
            author : req.session.user_info._id,
            type : type_inp
        }

        if (req.files) {

            let portfolio = req.files.portfolio_inp;
            let file_name = `${req.session.user_info.username}_${randomUUID()}.${portfolio.name.split(".").pop()}`;

            if(portfolio.size/(1024*1024) <= portfolio_limited_size){

                await portfolio.mv(`${app_dir}main/templates/whoopieV1/assets/media/portfolios/${file_name}`, async(err)=>{

                    if(err){

                        next(err);

                    }
                    else{

                        ad_data.portfolio = file_name;

                        let result = await ad_model.add(req.session.user_info, ad_data);

                        if(result){

                            return res.json({
                                status : 'success',
                                msg : '',
                                url : `${app_url}list`
                            });

                        }
                        else{

                            return res.json('شما حداکثر تعداد آگهی خود را ثبت کرده اید.');

                        }

                    }

                });

            }
            else{

                return res.json(`حداکثر حجم مجاز برای آپلود نمونه کار ${portfolio_limited_size} مگابایت می باشد.`);

            }

        }
        else{

            let result = await ad_model.add(req.session.user_info, ad_data);

            if(result){

                return res.json({
                    status : 'success',
                    msg : '',
                    url : `${app_url}list`
                });

            }
            else{

                return res.json('شما حداکثر تعداد آگهی خود را ثبت کرده اید.');

            }

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
