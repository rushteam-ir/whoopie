class Filemanager {

    async remove(path) {

        await fs.unlink(`${app_dir}media/avatars/${req.session.avatar}`, (err) => {

            if (err) {

                return null;

            }
            else{

                return true

            }

        });

    }

}

module.exports = FileManager = new Filemanager();
