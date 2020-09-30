const router = express.Router();

router.use(async(req, res, next)=>{

    try{

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
