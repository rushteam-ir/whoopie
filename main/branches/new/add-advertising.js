const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        let {title_inp, describe_inp, category_inp, other_describe_inp} = req.body;
        let tags_inp = req.body['tags_inp[]'];
        let validation_result = new Validation([
            {value : title_inp},
            {value : describe_inp},
            {value : category_inp},
            {value : other_describe_inp},
        ]).check();

        if(validation_result){

            return res.json(validation_result);

        }

        let ad_data = {
            title : title_inp,
            describe : describe_inp,
            category : category_inp,
            other_describe : other_describe_inp,
            tags : tags_inp,
            author : req.session.user_info._id
        }

        if (req.files || Object.keys(req.files).length !== 0) {

            // let avatar = req.files.avatar_inp;
            // let file_name = `${randomSha1String()}.${avatar_inp.name.split(".").pop()}`;
            //
            // if(avatar.size/1024 <= image_limited_size) {
            //
            //     await avatar.mv(`${app_dir}media/avatars/${file_name}`, async (err) => {
            //
            //         if (err) {
            //
            //             next(err);
            //
            //         }
            //         else {
            //
            //
            //         }
            //
            //     });
            //
            // }

        }

        let result = await ad_model.add(ad_data);

        if(result){

            return res.json({'success' : 'success'});

        }
        else{

            return res.json({'fail' : 'fail'});

        }

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
