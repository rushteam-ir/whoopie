module.exports = async(req, res, next)=>{

    let username = req.params.username;
    let user_info = await user_model.getByUserName(username);

    if(user_info){

        let data = {
            user_info : user_info
        }

        return res.render('index/profile', data);

    }
    else{

        return res.status(404).render('errors/404');

    }

}
