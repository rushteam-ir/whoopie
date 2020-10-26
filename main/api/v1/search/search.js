const router = express.Router();

const load = require('./load');

router.use('/load', load);

module.exports = router;
