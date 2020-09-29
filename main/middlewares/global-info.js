const router = express.Router();

router.use(async(req, res, next)=>{

    try{

        res.locals.g_user_info = null;

        if(!isUndefined(req.session.user_info)){

            res.locals.g_user_info = await user_model.getById(req.session.user_info._id);

        }

        next();

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
