const router = express.Router();

router.get('/:ad_id', async(req, res, next)=>{

    try{

        let {ad_id} = req.params;
        let find_ad = await ad_model.getByQuery({unique_id : ad_id});

        if(!isUndefined(find_ad[0])){

            let ad_info = {

            };

            res.json(ad_info)

        }
        else{

            res.json({
                "error" : "ad not found."
            })

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;