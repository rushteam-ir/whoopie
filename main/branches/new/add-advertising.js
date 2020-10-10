const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {title_inp, summary_inp, category_inp, describe_inp} = req.body;
        let tags_inp = req.body['tags_inp[]'];
        let validation_result = new Validation([
            {value : title_inp, type : 'empty'},
            {value : summary_inp, type : 'empty'},
            {value : category_inp, type : 'empty'},
            {value : describe_inp, type : 'empty'},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let ad_data = {
            title : title_inp,
            summary : summary_inp,
            category : category_inp,
            describe : describe_inp,
            tags : tags_inp,
            author : req.session.user_info._id
        }

        if (req.files) {

            let portfolio = req.files.portfolio_inp;
            let file_name = `${req.session.user_info.username}_${randomUUID()}.${portfolio.name.split(".").pop()}`;

            if(portfolio.size/(1024*1024) <= image_limited_size){

                await portfolio.mv(`${app_dir}main/templates/whoopieV1/assets/media/portfolios/${file_name}`, async(err)=>{

                    if(err){

                        next(err);

                    }
                    else{

                        ad_data.portfolio = file_name;

                        let result = await ad_model.add(ad_data);

                        if(result){

                            return res.json({'success' : 'success'});

                        }
                        else{

                            return res.json({'fail' : 'fail'});

                        }

                    }

                });

            }
            else{

                return res.json(`حداکثر حجم مجاز برای آپلود نمونه کار ${portfolio_limited_size} مگابایت می باشد.`);

            }

        }
        else{

            let result = await ad_model.add(ad_data);

            if(result){

                return res.json({'success' : 'success'});

            }
            else{

                return res.json({'fail' : 'fail'});

            }

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
