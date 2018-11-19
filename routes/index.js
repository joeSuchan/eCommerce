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

// Manage top-level request first
router.get('/', (req, res, next) => {
  LOG.debug('Request to /')
  res.render('index.ejs', { title: 'Express App' })
})
router.get("/customer", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("customer.ejs")
 })

router.get("/index", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
 })

 router.get("/products", function (req, res) {
  res.render("products.ejs")
 })

 router.get("/order", function (req, res) {
  res.render("order.ejs")
 })

 router.get("/orderLine", function (req, res) {
  res.render("orderLine.ejs")
 })
 router.get(function (req, res) {
  res.render('404')
})

// Defer path requests to a particular controller
//router.use('/about', require('../controllers/about.js')
<<<<<<< HEAD
router.use('/customers', require('../controllers/customer.js'))

=======
//router.use('/customers', require('../controllers/controller.js'))
router.use('/product', require('../controllers/product.js'))
>>>>>>> 350304c70a375a73831bc89df15e8882db683fbf
LOG.debug('END routing')
module.exports = router
