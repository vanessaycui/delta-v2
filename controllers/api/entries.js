const Entry = require('../../models/entry')
const Dashboard = require('../../models/dashboard'
)

//get date info
const date = new Date();
const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 0);

module.exports = {
  create: createEntry,
  getRow
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

async function getRow(req, res){
  console.log(req.body)
  let dashboard = await Dashboard.findById(req.params.id)
  //get prev month entries
  let entries = await Entry.find({category: req.body.name, dashboard: dashboard})
  console.log(entries)

  //get current month entries
  //get percent change

  res.status(200).json(entries)


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