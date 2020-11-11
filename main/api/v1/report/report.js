const router = express.Router();

const send = require('./send');

router.use('/send', send);

module.exports = router;
