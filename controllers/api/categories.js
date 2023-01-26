const Dashboard = require('../../models/dashboard')
const Entry = require('../../models/entry')

module.exports = {
    create: createCategory,
    delete: deleteCategory,
    update
};

async function createCategory(req, res){
    let dashboard = await Dashboard.findById(req.params.id)
    dashboard.categories.push(req.body)
    dashboard.save()
    res.status(200).json(dashboard)
}

function deleteCategory(req,res){
    Dashboard.findById(req.params.dId, function(err, dashboard){
        dashboard.categories.forEach(category=> {
            if (category.id === req.params.cId){
                Entry.deleteMany({category:category.name, dashboard: dashboard.id}).exec(function(err){
                    category.remove()
                    dashboard.save(function(err){
                        res.status(200).json("category group successfully deleted")
                    })
                })
            }
        })
    })
}

function update(req,res){
    Dashboard.findById(req.params.dId, function(err, dashboard){
        dashboard.categories.forEach(category=> {
            if (category.id === req.params.cId){
                Entry.updateMany({category: category.name, dashboard: dashboard.id}, {$set: {category:req.body.name}}).exec(function(err){
                    category.name = req.body.name
                    dashboard.save(function(err){
                        res.status(200).json("category renamed")
                    })
                })
            }
        })  
    })
}



