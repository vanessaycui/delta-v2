var express = require('express');
var router = express.Router();
var entriesCtrl = require('../../controllers/api/entries')
const ensureLoggedIn = require('../../config/ensureLoggedIn');

router.get('/dashboards/:id/entries/summary',ensureLoggedIn, entriesCtrl.getSummary )
router.post('/dashboards/:id/entries', ensureLoggedIn, entriesCtrl.create)
router.post('/dashboards/:id/entries/categories', ensureLoggedIn, entriesCtrl.getRowCategory)
router.post('/dashboards/:id/entries/incomes', ensureLoggedIn, entriesCtrl.getRowIncome)

// router.delete('/entries/:eId/categories/:cId',ensureLoggedIn, entriesCtrl.deleteCat)
// router.delete('/entries/:eId/incomes/:iId',ensureLoggedIn, entriesCtrl.deleteIncome)
// router.put('/entries/:eId/categories/:cId',ensureLoggedIn,entriesCtrl.updateCat)
// router.put('/entries/:eId/incomes/:iId',ensureLoggedIn,entriesCtrl.updateIncome)



module.exports = router;
