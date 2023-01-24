var express = require('express');
var router = express.Router();
var entriesCtrl = require('../../controllers/api/entries')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.post('/dashboards/:id/entries', ensureLoggedIn, entriesCtrl.create)
// router.delete('/entries/:eId/categories/:cId',ensureLoggedIn, entriesCtrl.deleteCat)
// router.delete('/entries/:eId/incomes/:iId',ensureLoggedIn, entriesCtrl.deleteIncome)
// router.put('/entries/:eId/categories/:cId',ensureLoggedIn,entriesCtrl.updateCat)
// router.put('/entries/:eId/incomes/:iId',ensureLoggedIn,entriesCtrl.updateIncome)



module.exports = router;
