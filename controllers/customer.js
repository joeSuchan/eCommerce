/**
 * Controller for Customers.
 * @ Author: Srujana Gattu
 *
 */

const express = require('express')
const api = express.Router()
const Model = require('../models/customers.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'customers'
api.get('/findall', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	const data = req.app.locals.customers.query
	res.send(JSON.stringify(data))
  })
  
  // GET one JSON by ID
  //
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

api.get('/create', (req, res) => {
	
	res.render('customers/create.ejs');
})

api.get('/delete/:id', (req, res) => {
	
	res.render('customers/delete.ejs');
})

api.get('/edit/:id', (req, res) => {
	
	res.render('customers/edit.ejs');
})

api.get('/details/:id', (req, res) => {
	
	res.render('customers/details.ejs');
})

api.get('/partial_edit/:id', (req, res) => {
	
	res.render('customers/partial_edit.ejs');
})
api.post('/save', (req, res) => {
	LOG.info(`Handling POST ${req}`)
	LOG.debug(JSON.stringify(req.body))
	const data = req.app.locals.customers.query
	const item = new Model()
	LOG.info(`NEW ID ${req.body._id}`)
	item._id = parseInt(req.body._id, 10) // base 10
	item.fisrtname = req.body.fisrtname
	item.lastname = req.body.lastname
	item.email = req.body.email
	item.age = parseInt(req.body.age, 10)
	item.street1 = req.body.street1
	item.street2 = req.body.street2
	item.city = req.body.city
	item.state = req.body.state
	item.country = req.body.country
	item.zip = req.body.zip
	
	  data.push(item)
	  LOG.info(`SAVING NEW CUSTOMER ${JSON.stringify(item)}`)
	  return res.redirect('/customer')
	
  })
  api.post('/save/:id', (req, res) => {
	LOG.info(`Handling SAVE request ${req}`)
	const id = parseInt(req.params.id, 10) // base 10
	LOG.info(`Handling SAVING ID=${id}`)
	const data = req.app.locals.customers.query
	const item = find(data, { _id: id })
	if (!item) { return res.end(notfoundstring) }
	LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
	LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
	item.fisrtname = req.body.fisrtname
	item.lastname = req.body.lastname
	item.email = req.body.email
	item.age = parseInt(req.body.age, 10)
	item.street1 = req.body.street1
	item.street2 = req.body.street2
	item.city = req.body.city
	item.state = req.body.state
	item.country = req.body.country
	item.zip = req.body.zip

	  LOG.info(`SAVING UPDATED customer ${JSON.stringify(item)}`)
	  return res.redirect('/customer')
	
  })
module.exports = api