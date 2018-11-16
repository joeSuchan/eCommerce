/**
 * orderLineItems controller
 * 11/15/2018
 * @author Telio de Castro */

const express = require('express')
const api = express.Router()
const Model = require('../models/orderLineItems.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'orderLineItems'

api.get("/", (req,res) => {
    res.render ("orderLineItems/index.ejs");
})

api.get("/create", (req,res) => {
    res.render ("orderLineItems/create.ejs");
})

api.get("/delete", (req,res) => {
    res.render ("orderLineItems/delete.ejs");
})

api.get("/read", (req,res) => {
    res.render ("orderLineItems/read.ejs");
})

api.get("/update", (req,res) => {
    res.render ("orderLineItems/update.ejs");
})
