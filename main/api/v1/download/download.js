const router = express.Router();

router.get('/:ad_id/:file_name', async(req, res, next)=>{

    try{

        let {ad_id, file_name} = req.params;
        let file_path = `${app_dir}main/templates/${config.main_template}/assets/media/portfolios/` + file_name;
        await ad_model.addRepByDownload(ad_id, req.session.token);

        try{
            return res.download(file_path, path.basename(file_path));
        }
        catch (err){
            return res.status(404).render('errors/404');
        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;