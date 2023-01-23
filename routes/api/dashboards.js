var express = require('express');
var router = express.Router();
var dashboardsCtrl = require('../../controllers/api/dashboards')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

/* GET users listing. */
router.get('/', ensureLoggedIn, dashboardsCtrl.index);
router.get('/:id', ensureLoggedIn, dashboardsCtrl.show)
// router.get('/:adminId', ensureLoggedIn, dashboardsCtrl.showDefault)
// router.delete('/:id', ensureLoggedIn, dashboardsCtrl.delete)
// router.put('/:id', ensureLoggedIn, dashboardsCtrl.update)
router.post('/', ensureLoggedIn, dashboardsCtrl.create)



module.exports = router;
