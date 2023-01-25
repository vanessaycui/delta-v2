const Dashboard = require('../../models/dashboard')
const Entry = require('../../models/entry')

module.exports = {
    // show,
    create: createIncome,
    delete: deleteIncome,
    // update
};

// function show(req, res){

//     Dashboard.findById(req.params.dId).exec(function(err, dashboard){
//         dashboard.incomes.forEach(income =>{
//             if (income.id === req.params.iId){
//                 Entry.find({dashboard: req.params.dId, incomeType: income.incomeType}).sort({date: -1}).exec(function(err,results){
//                     res.render('./incomes/show', {dashboard: dashboard, income: income, results: results})
//                 })
//             }
//         })
//     })
// }

async function createIncome(req, res){
    let dashboard = await Dashboard.findById(req.params.id)
    dashboard.incomes.push(req.body)
    dashboard.save()
    res.status(200).json(dashboard)
}

function deleteIncome(req, res){
    Dashboard.findById(req.params.dId, function(err, dashboard){
        dashboard.incomes.forEach(income=>{
            if (income.id === req.params.iId){
                Entry.deleteMany({incomeType: income.incomeType, dashboard: dashboard.id}).exec(function(err){
                    income.remove()
                    dashboard.save(function(err){
                        res.status(200).json("income groupsuccessfully deleted")
                    }) 
                })
                
            }
        })
        
    })
}
// //makeedits
// function update(req, res){
//     Dashboard.findById(req.params.dId, function(err, dashboard){
//         dashboard.incomes.forEach(income=>{
//             if (income.id === req.params.iId){
//                 Entry.updateMany({incomeType: income.incomeType, dashboard: dashboard.id}, {$set: {incomeType: req.body.incomeType}}).exec(function(err){
//                     income.incomeType = req.body.incomeType
//                     dashboard.save(function(err){
//                         res.redirect(`/dashboards/${req.params.dId}/incomes/${req.params.iId}`)
//                     }) 
//                 })
                
//             }
//         })
        
//     })
// }