/**
 * @index.js - manages all routing
 *
 * router.get when assigning to a single request
 * router.use when deferring to a controller
 *
 * @requires express
 */

const express = require('express')
const LOG = require('../utils/logger.js')

LOG.debug('START routing')
const router = express.Router()

router.get("/", function (req, res) {
  
  res.render("index.ejs")
 });
router.get("/customers", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("customers/index.ejs")
 })

// router.get("/index", function (req, res) {
//   //res.sendFile(path.join(__dirname + '/assets/index.html'))
//   res.render("index.ejs")
//  })

 router.get("/products", function (req, res) {
  res.render("products.ejs")
 })

 router.get("/order", function (req, res) {
  res.render("order.ejs")
 })

 router.get("/orderLineItem", function (req, res) {
  res.render("orderLineItem.ejs")
 })
 router.get("/about", function (req, res) {
  res.render("about/index.ejs")
 })
 router.get(function (req, res) {
  res.render("404.ejs")
})

// Defer path requests to a particular controller
//router.use('/about', require('../controllers/about.js')

router.use('/customers', require('../controllers/customer.js'))


//router.use('/customers', require('../controllers/controller.js'))
router.use('/products', require('../controllers/products.js'))

LOG.debug('END routing')
module.exports = router
