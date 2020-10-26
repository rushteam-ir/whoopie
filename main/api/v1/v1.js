const router = express.Router();

// Initiating all V1 API
const auth = require('./auth/auth');
const report = require('./report/report');
const search = require('./search/search');

router.use('/auth', auth);
router.use('/report', report);
router.use('/search', search);

module.exports = router;
