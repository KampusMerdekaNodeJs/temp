const router = require('express').Router();
const user = require('./user.router')

router.use('/',user)

module.exports = router;