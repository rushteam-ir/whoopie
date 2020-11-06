const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let {s, w} = req.query;

        if(!isUndefined(s)){

            // Search
            let search_inp = req.query.s;
            let category_inp = isObjectId(req.query.c) ? req.query.c : '0';
            let location_inp = (parseInt(req.query.l) < 0 || parseInt(req.query.l) > main_city_list.length || isNaN(req.query.l)) ? '0' : req.query.l;

            let filters = {
                category : category_inp === '0' ? null : category_inp,
                city : location_inp,
                page : 1
            }
            let data = {
                ad_list : await ad_model.getBySearch(search_inp, filters),
                search_value : search_inp,
                category_value : filters.category == null ? '0' : filters.category,
                city_value : filters.city,
                page_value : '1'
            }

            return res.render('index/search', data);

        }
        else if(!isUndefined(w)){

            // Watch an Ad
            let ad_info = await ad_model.getByQuery({
                unique_id : req.query.w,
            });

            if(ad_info){

                let data = {
                    ad_info : ad_info[0]
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

            return res.render('index/main', data);

        }

    }
    catch (error) {

        next(error);

    }

});

const profile = require('../profile/profile');

router.use('/', profile);

module.exports = router;
