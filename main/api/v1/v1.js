const router = express.Router();

// Initiating all V1 API
const auth = require('./auth/auth');
const send_report = require('./send-report');

router.use('/auth', auth);
router.use('/send-report', send_report);

module.exports = router;
