const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        req.session.destroy((err)=>{

            if(err){

                next(err)

            }
            else{

                // BUG HERE
                return res.redirect(app_url);

            }

        })

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
