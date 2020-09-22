// Initiating main rout configuration
main = express();
main.use(express.static(`${app_dir}main/templates/${config.main_template}/assets`));
main.set('views', `${app_dir}main/templates/${config.main_template}/views`);
