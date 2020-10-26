const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let search_inp = req.body.s;
        req.body.c = isObjectId(req.body.c) ? req.body.c : '0';
        req.body.l = (parseInt(req.body.l) < 0 || parseInt(req.body.l) > main_city_list.length || isNaN(req.body.l)) ? '0' : req.body.l;

        let filters = {
            category : req.body.c == '0' ? null : req.body.c,
            city : req.body.l,
            page : parseInt(req.body.p)
        }
        let data = {
            ad_list : await ad_model.getBySearch(search_inp, filters),
            search_value : search_inp,
            category_value : filters.category == null ? '0' : filters.category,
            city_value : filters.city,
            page_value : req.body.p,
            city_list : main_city_list,
            sex_list : main_sex_list,
        }

        return res.json(data);

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;

