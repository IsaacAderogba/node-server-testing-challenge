const router = require('express').Router();

router.get('/api', (req, res, next) => {
  try {
    res.status(200).json({ message: "Api is up and running" });
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;