var router = require('express').Router()

router.use('/auth', require('./user'))
router.use('/boards', require('./board'))
router.use('/boards/:boardId/sections', require('./section'))
router.use('/boards/:boardId/tasks', require('./task'))

module.exports = router;