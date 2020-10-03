const router = express.Router();

// Initiating all Auth sub routes
const general = require('./general');
const ad = require('./ad');

router.use('/general', general);
router.use('/ad', ad);

module.exports = router;
