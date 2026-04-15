var express = require('express');
var router = express.Router();


const ctrlUsers = require('../../app_server/controllers/users');

/* GET users listing. */
router.get('/', ctrlUsers.index);

module.exports = router;
