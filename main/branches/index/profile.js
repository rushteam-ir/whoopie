module.exports = async(req, res, next)=>{

    let watch_data = {
        unique_id : req.query.w,
    }
    let ad_info = await ad_model.getById(watch_data);

    if(ad_info){

        let data = {
            ad_info : ad_info
        }

        return res.render('index/watch', data);

    }
    else{

        return res.status(404).render('errors/404');

    }

}
