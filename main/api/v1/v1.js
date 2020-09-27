const router = express.Router();

// Initiating all V1 API
const auth = require('./auth/auth');
const new_report = require('./new-report');

router.use('/auth', auth);
router.use('/new-report', new_report);

module.exports = router;
