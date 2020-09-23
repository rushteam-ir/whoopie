const router = express.Router();

// Initiating all V1 API
const auth = require('./auth/auth');

router.use('/auth', auth);

module.exports = router;
