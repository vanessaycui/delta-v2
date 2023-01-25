const Entry = require("../../models/entry");
const Dashboard = require("../../models/dashboard");
var async = require("async");

module.exports = {
  index,
  create: createDashboard,
  show,
  delete: deleteDashboard,
  update,
};

function createDashboard(req, res) {
  req.body.admin = req.user._id;
  let dashboard = new Dashboard(req.body);
  dashboard.save();
  res.status(200).json(dashboard);
}

async function index(req, res) {
  //show all dashboards associated with user.
  const dashboards = await Dashboard.find({ admin: req.user._id }).populate(
    "admin"
  );
  res.status(200).json(dashboards);
}

async function show(req, res) {
  let dashboard = await Dashboard.findById(req.params.id);
  res.status(200).json(dashboard);
}

function deleteDashboard(req, res) {
  //delete, delete entries, spit out new dashboard list
  Dashboard.findById(req.params.id).exec(function (err, dashboard) {
    Entry.deleteMany({ dashboard: dashboard }).then(() => {
      dashboard.remove().then(() => {
        Dashboard.find({ admin: req.user._id })
          .populate("admin")
          .exec(function (err, results) {
            res.status(200).json(results);
          });
      });
    });
  });
}

async function update(req, res) {
  let dashboard = await Dashboard.findById(req.params.id);
  dashboard.title = req.body.title;
  dashboard.save(async function (err) {
    let dashboards = await Dashboard.find({ admin: req.user._id })
    res.status(200).json({dashboard: dashboard, dashboards: dashboards});
  });
}
