module.exports = async(req, res, next)=>{

    let search_inp = req.query.s;
    let filters = {
        category : req.query.c == '0' ? null : req.query.c,
        city : req.query.l,
    }
    let data = {
        ad_list : await ad_model.getBySearch(search_inp, filters),
        search_value : search_inp,
        category_value : filters.category == null ? '0' : filters.category,
        city_value : filters.city,
    }

    return res.render('index/search', data);

}
