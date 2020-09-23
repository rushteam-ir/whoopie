const router = express.Router();

// Version one API
const v1 = require('./v1/v1');

router.use('/v1', v1);

module.exports = router;
