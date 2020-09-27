const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let ad_id = req.params.id;
        let ad_info = await ad_model.getById(ad_id);

        if(ad_info){

            let data = {
                ad_info : ad_info
            }

            return res.render('edit/edit', data);

        }
        else{

            return res.status(404).render('errors/404');

        }

    }
    catch (error) {

        next(error);

    }

});

const edit_advertising = require('./edit-advertising');

router.use('/edit-advertising', edit_advertising);

module.exports = router;
