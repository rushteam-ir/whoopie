const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let result = await FileManager.remove(`${app_dir}media/avatars/${req.session.avatar}`);
    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
