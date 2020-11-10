const router = express.Router();

const ad_info = require('./ad-info');
const user_info = require('./user-info');

router.use('/ad-info', ad_info);
router.use('/user-info', user_info);

module.exports = router;