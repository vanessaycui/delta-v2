var router = require('express').Router();
var categoriesCtrl = require('../../controllers/api/categories')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/dashboards/:id/categories/', ensureLoggedIn,categoriesCtrl.create)
// router.get('/dashboards/:dId/categories/:cId', ensureLoggedIn, categoriesCtrl.show)
// router.delete('/dashboards/:dId/categories/:cId',ensureLoggedIn, categoriesCtrl.delete)
// router.put('/dashboards/:dId/categories/:cId', ensureLoggedIn,categoriesCtrl.update)

module.exports = router;
