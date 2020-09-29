const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        let parsed_url = req._parsedUrl.pathname;

        if(!parsed_url.endsWith('/')){

            parsed_url += '/';
            parsed_url = parsed_url.split('/')[1];

        }

        if(isUndefined(req.session.user_info)){

            // User is not logged in
            if(main_not_allowd_urls.includes(parsed_url)){

                return res.status(403).render('errors/403');

            }
            else{

                next();

            }

        }
        else{

            // User is logged in


        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
