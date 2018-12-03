/**
*  Controller for Products
*
* @author Meghana Putta <S533909@nwmissouri.edu>
*
*/

const express = require('express')
const api = express.Router()
const Model = require('../models/product.js')
const LOG = require('../utils/logger.js')
const find = require('lodash.find')
const remove = require('lodash.remove')
const notfoundstring = 'product'
api.get('/findall', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	const data = req.app.locals.products.query
	res.send(JSON.stringify(data))
  })
  
  // GET one JSON by ID
  //
  api.get('/findone/:id', (req, res) => {
	res.setHeader('Content-Type', 'application/json')
	const id = parseInt(req.params.id, 10) // base 10
	const data = req.app.locals.products.query
	const item = find(data, { _id: id })
	if (!item) { return res.end(notfoundstring) }
	res.send(JSON.stringify(item))
  })
api.get('/', (req, res) => {
	res.render('products/index.ejs');
})

api.get('/create', (req, res) => {
	
	res.render('products/create.ejs');
})

api.get('/delete/:id', (req, res) => {
	LOG.info(`Handling GET /delete/:id ${req}`)
	const id = parseInt(req.params.id, 10) // base 10
	const data = req.app.locals.products.query
	const item = find(data, { _id: id })
	if (!item) { return res.end(notfoundstring) }
	LOG.info(`RETURNING VIEW FOR ${JSON.stringify(item)}`)
	return res.render('products/delete.ejs',
	  {
		title: 'Delete product',
		layout: 'layout.ejs',
		product: item
	  })
  })
  api.post('/delete/:id', (req, res) => {
	LOG.info(`Handling DELETE request ${req}`)
	const id = parseInt(req.params.id, 10) // base 10
	LOG.info(`Handling REMOVING ID=${id}`)
	const data = req.app.locals.products.query
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
	return res.redirect('/products')
  })
  
  api.get('/edit/:id', (req, res) => {
	LOG.info(`Handling GET /edit/:id ${req}`)
	const id = parseInt(req.params.id, 10) // base 10
	const data = req.app.locals.products.query
	const item = find(data, { _id: id })
	if (!item) { return res.end(notfoundstring) }
	LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
   LOG.info(`RETURNING VIEW FOR${JSON.stringify(item)}`)
  
	return res.render('products/edit.ejs',
  
	  {
		title: 'products',
		layout: 'layout.ejs',
		product: item
	  })
  })

api.get('/details/:id', (req, res) => {
	
	res.render('products/details.ejs');
})

api.get('/partial_edit/:id', (req, res) => {
	
	res.render('products/partial_edit.ejs');
})
api.post('/save', (req, res) => {
	LOG.info(`Handling POST ${req}`)
	LOG.debug(JSON.stringify(req.body))
	const data = req.app.locals.products.query
	const item = new Model()
	LOG.info(`NEW ID ${req.body._id}`)
	item._id = parseInt(req.body._id, 10) // base 10
	item.productKey=req.body.productKey;
	item.description=req.body.description;
	item.unitPrice=parseInt(req.body.unitPrice, 10);
	item.color=req.body.color;
	item.rating=parseInt(req.body.rating,10);

	
	  data.push(item)
	  LOG.info(`SAVING NEW PRODUCT ${JSON.stringify(item)}`)
	  return res.redirect('/products')
	
  })
  api.post('/save/:id', (req, res) => {
	LOG.info(`Handling SAVE request ${req}`)
	const id = parseInt(req.params.id, 10) // base 10
	LOG.info(`Handling SAVING ID=${id}`)
	const data = req.app.locals.products.query
	const item = find(data, { _id: id })
	if (!item) { return res.end(notfoundstring) }
	LOG.info(`ORIGINAL VALUES ${JSON.stringify(item)}`)
	LOG.info(`UPDATED VALUES: ${JSON.stringify(req.body)}`)
	//item._id = parseInt(req.body._id, 10) // base 10
	item.productKey=req.body.productKey;
	item.description=req.body.description;
	item.unitPrice=parseInt(req.body.unitPrice, 10);
	item.color=req.body.color;
	item.rating=parseInt(req.body.rating,10);

	  LOG.info(`SAVING UPDATED PRODUCT ${JSON.stringify(item)}`)
	  return res.redirect('/products')
	
  })
module.exports = api