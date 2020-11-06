const router = express.Router();

router.get('/:id', async(req, res, next)=>{

    try{

        let ad_id = req.params.id;
        let ad_info = await ad_model.getByQuery({
            unique_id : ad_id,
            author : req.session.user_info._id
        });

        if(ad_info){

            let data = {
                ad_info : ad_info[0]
            }
            req.session.ad_id = ad_id;

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
