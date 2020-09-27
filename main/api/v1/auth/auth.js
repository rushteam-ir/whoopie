const router = express.Router();

// Initiating all Auth sub routes
const login = require('./login');
const register = require('./register');
const logout = require('./logout');

router.use('/login', login);
router.use('/register', register);
router.use('/logout', logout);

module.exports = router;
