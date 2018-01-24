"use strict";

let mongoose = require("mongoose");
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

let strings = require("../utils/strings");

let Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    posts: {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  },
  { timestamps: true }
);

/**
 * Sanitize the user fields before creating object in db
 */
UserSchema.pre("save", next => {
  if (this.isModified("firstName")) {
    this.firstName = strings.capitalizeWords(this.firstName);
  }

  if (this.isModified("lastName")) {
    this.lastName = this.lastName.toUpperCase();
  }

  // Only hash the password if it has been modified (or is new)
  if (this.isModified("password")) {
    bcrypt
      .hash(this.password, SALT_WORK_FACTOR)
      .then(hash => {
        // Override the cleartext password with the hashed one
        this.password = hash;
        next();
      })
      .catch(err => {
        next(err);
      });
  } else {
    next();
  }
});

/**
 * Sanitize the modified user fields before storing in db
 */
UserSchema.pre("update", next => {
  var values = this._update.$set;

  if (values.firstName) {
    values.firstName = strings.capitalizeWords(values.firstName);
  }

  if (values.lastName) {
    values.lastName = values.lastName.toUpperCase();
  }

  if (values.password) {
    bcrypt
      .hash(values.password, SALT_WORK_FACTOR)
      .then(hash => {
        // Override the cleartext password with the hashed one
        values.password = hash;
        next();
      })
      .catch(err => {
        next(err);
      });
  } else {
    next();
  }
});

/**
 * Compare the given password with the db encrypted one
 */
UserSchema.methods.validPassword = (candidatePassword, next) => {
  bcrypt
    .compare(candidatePassword, this.password)
    .then(match => {
      next(null, match);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Build an encrypted token from the current user
 */
UserSchema.methods.generateJWT = () => {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      isAdmin: this.isAdmin
    },
    env.jwtSecret,
    {
      expiresIn: "4h"
    }
  );
};

/**
 * Return the full user name
 */
UserSchema.methods.fullName = () => {
  return this.firstName + " " + this.lastName;
};

module.exports = mongoose.model("User", UserSchema);
