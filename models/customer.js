/** 
*  Customer model
*  Describes the characteristics of each attribute in a customer resource.
*
* @author Srujana Gattu <S533622@nwmissouri.edu>
*
*/

// bring in mongoose 
// see <https://mongoosejs.com/> for more information
const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({

    _id: {
        type: Number,
        required: true,
        description: "The unique identifier to identify a Customer"
    },
    
    firstname: {
        type: String,
        required: true,
        default: 'First Name'
       
    },
    lastname: {
        type: String,
        required: true,
        default: 'Last Name'
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
       
    },
    street1: {
        type: String,
        required: true,
        default: 'Street 1'
    },
    street2: {
        type: String,
        required: false,
        default: 'Street 2'
    },
    city: {
        type: String,
        required: true,
        default: 'Maryville'
    },
    state: {
        type: String,
        required: true,
        default: 'MO'
    },
    country: {
        type: String,
        required: true,
        default: 'USA'
    },
    zip: {
        type: String,
        required: true,
        default: '64468'
    }




})
module.exports = mongoose.model('customer', CustomerSchema)
