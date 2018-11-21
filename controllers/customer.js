/**
 * Controller for Customers.
 * @ Author: Srujana Gattu
 *
 */

const express = require('express')
const api = express.Router()
const Model = require('../models/customer.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'customer'

// RESPOND WITH JSON DATA  --------------------------------------------
// GET all JSON

api.get('/findall', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	const data = req.app.locals.customers.query
	res.send(JSON.stringify(data))
  })
  
  // GET one JSON by ID
  
  api.get('/findone/:id', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	const id = parseInt(req.params.id, 10) // base 10
	const data = req.app.locals.customers.query
	const item = find(data, { _id: id })
	if (!item) { return res.end(notfoundstring) }
	res.send(JSON.stringify(item))
  })
api.get('/', (req, res) => {
	res.render('customers/index.ejs');
})

// GET create
api.get('/create', (req, res) => {
	LOG.info(`Handling GET /create${req}`)
	const item = new Model()
	LOG.debug(JSON.stringify(item))
	res.render('customers/create',
	  {
		title: 'Create customer',
		layout: 'layout.ejs',
		customer: item
	  })
  })
  

// GET /details/:id
api.get('/details/:id', (req, res) => {
  LOG.info(`Handling GET /details/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.customers.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
  return res.render('customers/details.ejs',
    {
      title: 'customer Details',
      layout: 'layout.ejs',
      customer: item
    })
})

// GET one
api.get('/edit/:id', (req, res) => {
  LOG.info(`Handling GET /edit/:id ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  const data = req.app.locals.customers.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
 LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)

  return res.render('customers/edit.ejs',

    {
      title: 'customer',
      layout: 'layout.ejs',
      customer: item
    })
})


// HANDLE EXECUTE DATA MODIFICATION REQUESTS --------------------------------------------

// POST new
api.post('/save', (req, res) => {
  LOG.info(`Handling POST ${req}`)
  LOG.debug(JSON.stringify(req.body))
  const data = req.app.locals.customers.query
  const item = new Model()
  LOG.info(`NEW ID ${req.body._id}`)
  item._id = parseInt(req.body._id, 10) // base 10
  item.email = req.body.email
  item.Firstname = req.body.Firstname
  item.Lastname = req.body.Lastname
  item.street1 = req.body.street1
  item.street2 = req.body.street2
  item.city = req.body.city
  item.state = req.body.state
  item.zip = req.body.zip
  item.country = req.body.country

    data.push(item)
    LOG.info(`SAVING NEW customer ${JSON.stringify(item)}`)
    return res.redirect('/customers')
  
})

// POST update
api.post('/save/:id', (req, res) => {
  LOG.info(`Handling SAVE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling SAVING ID=${id}`)
  const data = req.app.locals.customers.query
  const item = find(data, { _id: id })
  if (!item) { return res.end(notfoundstring) }
  LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
  LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
  item.email = req.body.email
  item.Firstname = req.body.Firstname
  item.Lastname = req.body.Lastname
  item.street1 = req.body.street1
  item.street2 = req.body.street2
  item.city = req.body.city
  item.state = req.body.state
  item.zip = req.body.zip
  item.country = req.body.country
  
    LOG.info(`SAVING UPDATED customer ${JSON.stringify(item)}`)
    return res.redirect('/customers')
  
})

// DELETE id (uses HTML5 form method POST)
api.post('/delete/:id', (req, res) => {
  LOG.info(`Handling DELETE request ${req}`)
  const id = parseInt(req.params.id, 10) // base 10
  LOG.info(`Handling REMOVING ID=${id}`)
  const data = req.app.locals.customers.query
  const item = find(data, { _id: id })
  if (!item) {
    return res.end(notfoundstring)
  }
  if (item.isActive) {
    item.isActive = false
    console.log(`Deacctivated item ${JSON.stringify(item)}`)
  } else {
    const item = remove(data, { _id: id })
    console.log(`Permanently deleted item ${JSON.stringify(item)}`)
  }
  return res.redirect('/customers')
})

module.exports = api