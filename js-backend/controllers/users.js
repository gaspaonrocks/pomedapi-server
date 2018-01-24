let User = require("../models/users");
let handle = require("../utils/handler");

module.exports = {
  list(req, res, next) {
    User.find({}, (err, users) => {
      if (err) handle(res).errors(err, "list");
      else handle(res).success(users);
    });
  },
  find(req, res, next) {
    User.findById(req.params.param1, (err, user) => {
      if (err) handle(res).errors(err, "find");
      else handle(res).success(user);
    });
  },
  create(req, res, next) {
    User.create(req.body, (err, user) => {
      if (err) handle(res).errors(err, "create");
      else handle(res).success(user);
    });
  },
  update(req, res, next) {
    User.findByIdAndUpdate(req.params.param1, req.body, (err, user) => {
      if (err) handle(res).errors(err, "update");
      else handle(res).success(user);
    });
  },
  delete(req, res, next) {
    User.findByIdAndRemove(req.params.param1, (err, user) => {
      if (err) handle(res).errors(err, "delete");
      else handle(res).success(user);
    });
  }
};
