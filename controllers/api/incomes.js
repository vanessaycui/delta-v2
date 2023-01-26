const Dashboard = require('../../models/dashboard')
const Entry = require('../../models/entry')

module.exports = {
    create: createIncome,
    delete: deleteIncome,
    update
};

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

function update(req, res){
    Dashboard.findById(req.params.dId, function(err, dashboard){
        dashboard.incomes.forEach(income=>{
            if (income.id === req.params.iId){
                Entry.updateMany({incomeType: income.incomeType, dashboard: dashboard.id}, {$set: {incomeType: req.body.incomeType}}).exec(function(err){
                    income.incomeType = req.body.incomeType
                    dashboard.save(function(err){
                        res.status(200).json("income renamed")
                    }) 
                })
            }
        })
    })
}