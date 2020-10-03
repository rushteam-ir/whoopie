const router = express.Router();

// Initiating all V1 API
const auth = require('./auth/auth');
const report = require('./report/report');

router.use('/auth', auth);
router.use('/report', report);

module.exports = router;
