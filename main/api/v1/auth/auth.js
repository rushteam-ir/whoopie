const router = express.Router();

// Initiating all Auth sub routes
const login = require('./login');
const register = require('./register');

router.use('/login', login);
router.use('/register', register);

module.exports = router;
