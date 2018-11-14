/** 
*  Order Line
*  Describes the characteristics of each attribute in an order line item resource.
*
* @author Telio de Castro <S523323@nwmissouri.edu>
*
*/

// bring in mongoose 
// see <https://mongoosejs.com/> for more information

const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({

orderLineID: { 
    type: Number,
    required: true},

orderID:{
    type: Number,
    required: true},

productQuantity:{
    type: Number,
    required: true,
    default: 1},

productID:{
    type: Number,
    required: true},

productPrice:{
    type: Number,
    required: true,
    default: 5.00}


})

module.exports = mongoose.model('OrderLineItem', OrderLineItemSchema)




