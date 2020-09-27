const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let {w} = req.query;
        let watch_data = {
            unique_id : w,
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
    catch (error) {

        next(error);

    }

});

module.exports = router;
