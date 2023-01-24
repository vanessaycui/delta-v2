const Dashboard = require('../../models/dashboard')
const Entry = require('../../models/entry')

module.exports = {
    // show,
    create: createCategory,
    // delete: deleteCategory,
    // update
};

// function show(req, res){
//     Dashboard.findById(req.params.dId).exec(function(err, dashboard){
//         dashboard.categories.forEach(category=>{
//             if (category.id === req.params.cId){
//                 Entry.find({category: category.name, dashboard: req.params.dId}).sort({date: -1}).exec(function(err, results){
//                     res.render('./categories/show', {dashboard: dashboard, category: category, results: results})
//                 })
//             }
//         })
//     })
// }

async function createCategory(req, res){
    let dashboard = await Dashboard.findById(req.params.id)
    dashboard.categories.push(req.body)
    dashboard.save()
    res.status(200).json(dashboard)
}

// function deleteCategory(req,res){
//     Dashboard.findById(req.params.dId, function(err, dashboard){
//         dashboard.categories.forEach(category=> {
//             if (category.id === req.params.cId){
//                 Entry.deleteMany({category:category.name, dashboard: dashboard.id}).exec(function(err){
//                     category.remove()
//                     dashboard.save(function(err){
//                         res.redirect(`/dashboards/${req.params.dId}`)
//                     })
//                 })
//             }
//         })
//     })
// }


// function update(req,res){
//     Dashboard.findById(req.params.dId, function(err, dashboard){
//         dashboard.categories.forEach(category=> {
//             if (category.id === req.params.cId){
//                 Entry.updateMany({category: category.name, dashboard: dashboard.id}, {$set: {category:req.body.name}}).exec(function(err){
//                     category.name = req.body.name
//                     dashboard.save(function(err){
//                         res.redirect(`/dashboards/${req.params.dId}/categories/${req.params.cId}`)
//                     })
//                 })
//             }
//         })
        
//     })

// }



