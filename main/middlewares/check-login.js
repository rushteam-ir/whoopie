const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        let parsed_url = req._parsedUrl.pathname;

        if(!parsed_url.endsWith('/')){

            parsed_url += '/';

        }

        if(isUndefined(req.session.user_info)){

            // User is not logged in
            if(!main_not_allowd_urls.includes(parsed_url)){

                next();

            }
            else{

                return res.redirect(app_url);

            }

        }
        else{

            // User is logged in
            next();

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
