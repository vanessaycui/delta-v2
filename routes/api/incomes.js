var router = require('express').Router();
var incomesCtrl = require('../../controllers/api/incomes')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// router.get('/dashboards/:dId/incomes/:iId',  ensureLoggedIn, incomesCtrl.show)
router.post('/dashboards/:id/incomes', ensureLoggedIn, incomesCtrl.create)
// router.delete('/dashboards/:dId/incomes/:iId', ensureLoggedIn,  incomesCtrl.delete)
// router.put('/dashboards/:dId/incomes/:iId',  ensureLoggedIn, incomesCtrl.update)

module.exports = router;
