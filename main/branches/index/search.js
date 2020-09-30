module.exports = async(req, res, next)=>{

    let search_inp = req.query.s;
    let filters = {
        category : isUndefined(req.query.c) ? null : req.query.c,
        city : isUndefined(req.query.l) ? null : req.query.l,
    }
    let data = {
        ad_list : await ad_model.getBySearch(search_inp, filters),
        search_value : search_inp
    }

    log(data);

    return res.render('index/search', data);

}
