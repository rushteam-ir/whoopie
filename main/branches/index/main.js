const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let {s, c, l, p, w} = req.query;

        if(!isUndefined(s)){

            // Search
            let search_inp = s;
            let search_query = {
                category : isUndefined(c) ? null : c,
                city : isUndefined(l) ? null : l,
            }
            let data = {
                ad_list : await ad_model.getBySearch(search_inp, search_query),
                search_value : search_inp
            }

            res.render('index/search', data);

        }
        else if(!isUndefined(w)){

            // Watch an Ad
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
        else{

            // Default page
            let data = {
                category_list : await category_model.getAll()
            }

            res.render('index/main', data);

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;