const router = express.Router();

const watch = require('./watch');

router.use('/watch', watch);

module.exports = router;