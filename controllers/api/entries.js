const Entry = require("../../models/entry");
const Dashboard = require("../../models/dashboard");

//get date info
const date = new Date();
const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 0);

module.exports = {
  create: createEntry,
  getRowCategory,
  getRowIncome,
  getSummary,
  getFilteredEntries,
  delete:deleteEntry,
  updateIncome,
  updateCategory,
};

function deleteEntry(req,res){
  Entry.findById(req.params.eId).exec(function(err,entry){
    entry.remove()
    Dashboard.findById(req.params.dId).exec(function(err, dashboard){
      res.status(200).json(dashboard)
    })
    
  })
}

async function createEntry(req, res) {
  req.body.dashboard = req.params.id;
  let entry = new Entry(req.body);
  entry.save();
  let dashboard = await Dashboard.findById(req.params.id);
  res.status(200).json(dashboard);
}

async function getRowCategory(req, res) {
  //get related dash and related entries to dashId + category type
  let dashboard = await Dashboard.findById(req.params.id);
  let entries = await Entry.find({
    category: req.body.name,
    dashboard: dashboard,
  });
  let rowData = { prevMonth: 0, currMonth: 0, change: 0 };

  //calc data for a row in table.
  let prevMonthEntries = entries.filter(
    (entry) => entry.date >= prevMonthDate && entry.date < currentMonthDate
  );
  let currMonthEntries = entries.filter(
    (entry) => entry.date >= currentMonthDate && entry.date < nextMonthDate
  );
  let prevMonthSum = prevMonthEntries.reduce(function (total, entry) {
    return total + entry.cost;
  }, 0);
  let currMonthSum = currMonthEntries.reduce(function (total, entry) {
    return total + entry.cost;
  }, 0);

  let perChange = (
    ((currMonthSum - prevMonthSum) * 100) /
    prevMonthSum
  ).toFixed(2);

  if (prevMonthSum === 0) {
    perChange = "-";
  }
  rowData = {
    prevMonth: prevMonthSum.toFixed(2),
    currMonth: currMonthSum.toFixed(2),
    change: perChange,
  };

  res.status(200).json(rowData);
}

async function getRowIncome(req, res) {
  // get related dash and related entries to dashId + category type
  let dashboard = await Dashboard.findById(req.params.id);
  let entries = await Entry.find({
    incomeType: req.body.incomeType,
    dashboard: dashboard,
  });
  let rowData = { prevMonth: 0, currMonth: 0, change: 0 };

  //calc data for a row in table.
  let prevMonthEntries = entries.filter(
    (entry) => entry.date >= prevMonthDate && entry.date < currentMonthDate
  );
  let currMonthEntries = entries.filter(
    (entry) => entry.date >= currentMonthDate && entry.date < nextMonthDate
  );
  let prevMonthSum = prevMonthEntries.reduce(function (total, entry) {
    return total + entry.income;
  }, 0);
  let currMonthSum = currMonthEntries.reduce(function (total, entry) {
    return total + entry.income;
  }, 0);

  let perChange = (
    ((currMonthSum - prevMonthSum) * 100) /
    prevMonthSum
  ).toFixed(2);

  if (prevMonthSum === 0) {
    perChange = "-";
  }

  rowData = {
    prevMonth: prevMonthSum.toFixed(2),
    currMonth: currMonthSum.toFixed(2),
    change: perChange,
  };

  res.status(200).json(rowData);
}

async function getSummary(req, res) {
  //get related dash and related entries to dashId
  let dashboard = await Dashboard.findById(req.params.id);
  let entries = await Entry.find({
    dashboard: dashboard
  });
  let summaryData = {
    prevMonth: {
      expenseTotal: (0).toFixed(2),
      incomeTotal: (0).toFixed(2),
      netSavings: 0
    },
    currMonth: {
      expenseTotal: (0).toFixed(2),
      incomeTotal: (0).toFixed(2),
      netSavings: 0
    },
  };

  //Previous Month Summary
  let prevMonthEntriesIncome = entries.filter(
    (entry) => entry.date >= prevMonthDate && entry.date < currentMonthDate && entry.income
  );
  let prevMonthEntriesExpense = entries.filter(
    (entry) => entry.date >= prevMonthDate && entry.date < currentMonthDate && entry.cost
  );

  if (prevMonthEntriesIncome.length >0){

    summaryData.prevMonth.incomeTotal= prevMonthEntriesIncome.reduce(function (total, entry) {
      return total + entry.income;
    }, 0).toFixed(2);
  }
  if (prevMonthEntriesExpense.length >0){
    summaryData.prevMonth.expenseTotal = prevMonthEntriesExpense.reduce(function (total, entry) {
      return total + entry.cost;
    }, 0).toFixed(2);
    
  } 
  //Current Month Summary, gotta filter whether income or cost exists in entry.
  let currMonthEntriesIncome = entries.filter(
    (entry) => entry.date >= currentMonthDate && entry.date < nextMonthDate && entry.income
  );

  let currMonthEntriesExpense = entries.filter(
    (entry) => entry.date >= currentMonthDate && entry.date < nextMonthDate && entry.cost
  );
  //calculations.
  if (currMonthEntriesIncome.length>0){
    summaryData.currMonth.incomeTotal = currMonthEntriesIncome.reduce(function (total, entry) {
      return total + entry.income;
    }, 0).toFixed(2);
  }

  if (currMonthEntriesExpense.length>0){
    summaryData.currMonth.expenseTotal  = currMonthEntriesExpense.reduce(function (total, entry) {
      return total + entry.cost;
    }, 0).toFixed(2);
  }
  //Summary Totals
  summaryData.currMonth.netSavings = (summaryData.currMonth.incomeTotal  - summaryData.currMonth.expenseTotal).toFixed(2)
  summaryData.prevMonth.netSavings = (summaryData.prevMonth.incomeTotal  - summaryData.prevMonth.expenseTotal).toFixed(2)


  res.status(200).json(summaryData);
}

async function getFilteredEntries(req,res){

  let entries = await Entry.find({dashboard:req.params.id})
  let sortedEntries;

  if (req.body.income){
    sortedEntries = entries.filter(entry=> entry.incomeType === req.body.income)

  } else if (req.body.category){
    sortedEntries = entries.filter(entry=> entry.category === req.body.category)
  }

  res.status(200).json(sortedEntries)

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

function updateIncome(req,res){
  Entry.findById(req.params.eId).exec(function(err, entry){
    entry.company =req.body.company
    entry.date = new Date(req.body.date)
    entry.income = req.body.income
    entry.incomeType=req.body.incomeType
    entry.comment = req.body.comment
    entry.save(function(err){
      res.status(200).json("income entry successfully updated")
    })
  })
}

function updateCategory(req,res){
  Entry.findById(req.params.eId).exec(function(err, entry){
    entry.category =req.body.category
    entry.company =req.body.company
    entry.date = new Date(req.body.date)
    entry.cost = req.body.income
    entry.comment = req.body.comment
    entry.save(function(err){
      res.status(200).json("income entry successfully updated")
    })
  })
}
