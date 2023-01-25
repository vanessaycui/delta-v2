var express = require('express');
var router = express.Router();
var entriesCtrl = require('../../controllers/api/entries')
const ensureLoggedIn = require('../../config/ensureLoggedIn');


router.get('/dashboards/:id/entries/summary',ensureLoggedIn, entriesCtrl.getSummary )
router.get('/dashboards/:id/entries', ensureLoggedIn, entriesCtrl.index)
router.post('/dashboards/:id/entries', ensureLoggedIn, entriesCtrl.create)
router.post('/dashboards/:id/entries/categories', ensureLoggedIn, entriesCtrl.getRowCategory)
router.post('/dashboards/:id/entries/incomes', ensureLoggedIn, entriesCtrl.getRowIncome)
router.post('/dashboards/:id/entries/filtered', ensureLoggedIn, entriesCtrl.getFilteredEntries)
router.delete('/dashboards/:dId/entries/:eId', ensureLoggedIn, entriesCtrl.delete)
router.put('/dashboards/:dId/entries/:eId/income', ensureLoggedIn, entriesCtrl.updateIncome)
router.put('/dashboards/:dId/entries/:eId/category', ensureLoggedIn, entriesCtrl.updateCategory)

module.exports = router;
