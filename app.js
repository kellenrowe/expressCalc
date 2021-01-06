"use strict";

/** Simple demo Express app. */

const express = require("express");
const { findMean, findMedian, findMode } = require("./stats.js");
const app = express();

app.use(express.json());
// useful error class to throw
const { NotFoundError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res) {
  let nums = req.query.nums;
  nums = nums.split(',');
  nums = nums.map(n => Number(n));
  return res.json({
      operation: "mean",
      value: `${findMean(nums)}`
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res) {
  let nums = req.query.nums;
  nums = nums.split(',');
  nums = nums.map(n => Number(n));
  // console.log('nums = ', nums);
  return res.json({
      operation: "median",
      value: `${findMedian(nums)}`
  });
});


/** Finds mode of nums in qs: returns {operation: "mode", result } */
app.get("/mode", function (req, res) {
  let nums = req.query.nums;
  nums = nums.split(',');
  nums = nums.map(n => Number(n));
  // console.log('nums = ', nums);
  return res.json({
      operation: "mode",
      value: `${findMode(nums)}`
  });
});


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;