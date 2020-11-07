const router = express.Router();

router.get('/:ad_id/:file_name', async(req, res, next)=>{

    try{

        let {ad_id, file_name} = req.params;
        let file_path = `${app_dir}main/templates/${config.main_template}/assets/media/portfolios/` + file_name;

        fs.access(file_path, fs.constants.F_OK, async (err) => {

            if(!err){

                let result = await ad_model.addRepByDownload(ad_id, file_name, req.session.token);

                if(result){

                    return res.download(file_path, path.basename(file_path));

                }
                else{

                    return res.status(404).render('errors/404');

                }

            }
            else{

                return res.status(404).render('errors/404');

            }

        });

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;