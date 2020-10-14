const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        res.locals.g_category_list = await category_model.getAll();
        res.locals.g_category_list.unshift({_id : 0, title : 'همه دسته بندی ها'});
        res.locals.g_city_list = main_city_list;
        res.locals.g_military_list = main_military_list;
        res.locals.g_marital_list = main_marital_list;
        res.locals.g_sex_list = main_sex_list;

        res.locals.g_category_list_new = res.locals.g_category_list.slice(1);
        res.locals.g_city_profile = res.locals.g_city_list.slice(1);
        res.locals.g_city_profile.unshift('-');

        res.locals.g_user_info = null;

        if(!isUndefined(req.session.user_info)){

            res.locals.g_user_info = req.session.user_info;

        }

        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
