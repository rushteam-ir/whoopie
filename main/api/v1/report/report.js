const router = express.Router();

const send = require('./send');

router.use('/user', send);

module.exports = router;
