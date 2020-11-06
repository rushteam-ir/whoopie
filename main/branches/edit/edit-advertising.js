const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {title_inp, summary_inp, category_inp, describe_inp, type_inp, delete_portfolio_inp} = req.body;
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

        let last_ad_data = await ad_model.findOne({unique_id : req.session.ad_id});

        let ad_data = {
            title : title_inp,
            summary : summary_inp,
            category : category_inp,
            describe : describe_inp,
            tags : tags_inp,
            type : type_inp
        }

        if(delete_portfolio_inp == '1'){

            await fs.unlink(`${app_dir}main/templates/whoopieV1/assets/media/portfolios/${last_ad_data.portfolio}`, async(err) => {

                ad_data.portfolio = '';
                await ad_model.edit(req.session.ad_id, ad_data);

            });

        }


        if (req.files) {

            let portfolio = req.files.portfolio_inp;
            let file_name = `${randomSha1String()}.${portfolio.name.split(".").pop()}`;

            if(portfolio.size/(1024*1024) <= portfolio_limited_size){

                await portfolio.mv(`${app_dir}main/templates/whoopieV1/assets/media/portfolios/${file_name}`, async(err)=>{

                    if(err){

                        next(err);

                    }
                    else{

                        await fs.unlink(`${app_dir}main/templates/whoopieV1/assets/media/portfolios/${last_ad_data.portfolio}`, async(err) => {


                        });

                        ad_data.portfolio = file_name;

                        let result = await ad_model.edit(req.session.ad_id, ad_data);

                        if(result){

                            return res.json({
                                status : 'success',
                                msg : '',
                                url : `${app_url}list`
                            });

                        }
                        else{

                            return res.json('مشکل برقراری ارتباط با سرور');

                        }

                    }

                });

            }
            else{

                return res.json(`حداکثر حجم مجاز برای آپلود نمونه کار ${portfolio_limited_size} مگابایت می باشد.`);

            }

        }
        else{

            let result = await ad_model.edit(req.session.ad_id, ad_data);

            if(result){

                return res.json({
                    status : 'success',
                    msg : '',
                    url : `${app_url}list`
                });

            }
            else{

                return res.json('مشکل برقراری ارتباط با سرور');

            }

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
