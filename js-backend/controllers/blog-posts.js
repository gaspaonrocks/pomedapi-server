let Post = require("../models/blog-posts");
let handle = require("../utils/handler");

module.exports = {
  list(req, res, next) {
    Post.find({}, (err, posts) => {
      if (err) handle(res).errors(err, "list");
      else handle(res).success(posts);
    });
  },
  find(req, res, next) {
    Post.findById(req.params.param1, (err, post) => {
      if (err) handle(res).errors(err, "find");
      else handle(res).success(post);
    });
  },
  create(req, res, next) {
    Post.create(req.body, (err, post) => {
      if (err) handle(res).errors(err, "create");
      else handle(res).success(post);
    });
  },
  update(req, res, next) {
    Post.findByIdAndUpdate(req.params.param1, req.body, (err, post) => {
      if (err) handle(res).errors(err, "update");
      else handle(res).success(post);
    });
  },
  delete(req, res, next) {
    Post.findByIdAndRemove(req.params.param1, (err, post) => {
      if (err) handle(res).errors(err, "delete");
      else handle(res).success(post);
    });
  }
};
