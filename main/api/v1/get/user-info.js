const router = express.Router();

router.get('/:username', async(req, res, next)=>{

    try{

        res.json({'msg' : 'This API is not ready yet ...'});

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;