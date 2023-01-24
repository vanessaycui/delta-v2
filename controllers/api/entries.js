const Entry = require('../../models/entry')
module.exports = {
  create: createEntry,
  // deleteCat: deleteCategoryEntry,
  // deleteIncome: deleteIncomeEntry,
  // updateCat: updateCategoryEntry,
  // updateIncome: updateIncomeEntry

};

async function createEntry(req, res){
  req.body.dashboard = req.params.id
  let entry = new Entry(req.body)
  await entry.save()
  
  res.status(200).json("new entry created")    
}

// function deleteCategoryEntry(req,res){
//   Entry.findById(req.params.eId).exec(function(err, entry){
//     entry.remove()
//     entry.save(function(err){
//       res.redirect(`/dashboards/${entry.dashboard}/categories/${req.params.cId}`)
//     })
//   })
// }

// function updateCategoryEntry(req,res){
//   Entry.findById(req.params.eId).exec(function(err, entry){
//     entry.company =req.body.company
//     entry.date = new Date(req.body.date)
//     entry.cost = req.body.cost
//     entry.comment = req.body.comment
//     entry.person = req.body.person
//     entry.save(function(err){
//       res.redirect(`/dashboards/${entry.dashboard}/categories/${req.params.cId}`)
//     })
//   })
// }

// function deleteIncomeEntry(req,res){
//   Entry.findById(req.params.eId).exec(function(err, entry){
//     entry.remove()
//     entry.save(function(err){
//       res.redirect(`/dashboards/${entry.dashboard}/incomes/${req.params.iId}`)
//     })
//   })
// }

// function updateIncomeEntry(req,res){
//   Entry.findById(req.params.eId).exec(function(err, entry){
//     entry.company =req.body.company
//     entry.date = new Date(req.body.date)
//     entry.income = req.body.income
//     entry.comment = req.body.comment
//     entry.person = req.body.person
//     entry.save(function(err){
//       res.redirect(`/dashboards/${entry.dashboard}/incomes/${req.params.iId}`)
//     })
//   })
// }