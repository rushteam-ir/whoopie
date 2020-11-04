const router = express.Router();

// Initiating all Auth sub routes
const general = require('./general');
const ad = require('./ad');
const user = require('./user');

router.use('/general', general);
router.use('/ad', ad);
router.use('/user', user);

module.exports = router;
