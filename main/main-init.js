// Initiating main rout configuration
main = express();
//main.use(helmet());
main.use(express.static(`${app_dir}main/templates/${config.main_template}/assets`));
main.set('views', `${app_dir}main/templates/${config.main_template}/views`);

main_not_allowd_urls = ['user', 'list', 'new'];
main_city_list = [
    'همه شهر ها',
    'آذربایجان شرقی',
    'آذربایجان غربی',
    'اردبیل',
    'اصفهان',
    'البرز',
    'ایلام',
    'بوشهر',
    'تهران',
    'چهارمحال و بختیاری',
    'خراسان جنوبی',
    'خراسان رضوی',
    'خراسان شمالی',
    'خوزستان',
    'زنجان',
    'سمنان',
    'سیستان و بلوچستان',
    'فارس',
    'قزوین',
    'قم',
    'کردستان',
    'کرمان',
    'کرمانشاه',
    'کهگیلویه و بویراحمد',
    'گلستان',
    'گیلان',
    'لرستان',
    'مازندران',
    'مرکزی',
    'هرمزگان',
    'همدان',
    'یزد',
];

main_military_list = [
    '-',
    'معافیت تحصیلی',
    'معافیت دائم',
    'پایان خدمت',
    'در حال خدمت',
    'مشمول',
];

main_marital_list = [
    '-',
    'مجرد',
    'متاهل'
];

main_sex_list = [
    '-',
    'مرد',
    'زن',
];

main_report_list = [
    'محتوای نامناسب',
    'عکس نامناسب',
    'دسته بندی نامناسب با محتوای آگهی',
    'برچسب نامربوط',
    'سایر'
];

main.locals.image_limited_size = image_limited_size;
main.locals.portfolio_limited_size = portfolio_limited_size;

main.locals.app_url = app_url;
