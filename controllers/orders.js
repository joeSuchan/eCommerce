/**
 * Orders controller
 * 11/15/2018
 * @author Joe Suchan - s516611@nwmissouri.edu */

const express = require('express')
const api = express.Router()
const Model = require('../models/orders.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'orders'

api.get("/", (req,res) => {
    res.render ("orders/index.ejs");
})

api.get("/create", (req,res) => {
    res.render ("orders/create.ejs");
})

api.get("/delete", (req,res) => {
    res.render ("orders/delete.ejs");
})

api.get("/read", (req,res) => {
    res.render ("orders/read.ejs");
})

api.get("/update", (req,res) => {
    res.render ("orders/update.ejs");
})
