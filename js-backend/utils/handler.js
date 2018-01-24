"use strict";

module.exports = (res) => {
  return {
    errors: (err, method) => {
      return res.status(500).json({
        message: `error ${method}-ing collection/document from database`,
        error: err
      });
    },
    success: (object) => {
      return res.status(200).json(object);
    }
  };
};
