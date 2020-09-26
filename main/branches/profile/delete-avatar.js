const router = express.Router();

router.post('/', async(req, res, next)=>{

    try{

        await fs.unlink(`${app_dir}media/avatars/${req.session.avatar}`, (err) => {

            if (err) {

                res.end();

            }
            else{

                return res.json('تصویر پروفایل با موفقیت حذف شد.');

            }

        });

    }
    catch (error) {

        next(error);

    }

});

module.exports = router;
