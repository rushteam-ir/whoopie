const router = express.Router();

// Initiating all V1 API
const auth = require('./auth/auth');
const report = require('./report/report');
const search = require('./search/search');
const download = require('./download/download');
const analyse = require('./analyse/analyse');
const get = require('./get/get');

router.use('/auth', auth);
router.use('/report', report);
router.use('/search', search);
router.use('/download', download);
router.use('/analyse', analyse);
router.use('/get', get);

module.exports = router;
