const router = express.Router();

router.get('/', async(req, res, next)=>{

    try{

        let {ad_id} = req.query;

        let find_ad = await ad_model.getByQuery({unique_id : ad_id});

        if(find_ad){

            if(find_ad.author._id === req.session.user_info._id) {

                let result = await ad_model.delete(ad_id);

                if (result) {

                    await fs.unlink(`${app_dir}main/templates/whoopieV1/assets/media/portfolios/${result.portfolio}`, async(err) => {


                    });

                    return res.redirect(`${app_url}list`)

                }

            }

        }

        return res.redirect(`${app_url}list`)

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
