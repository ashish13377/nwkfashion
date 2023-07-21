// order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    razorpay: { 
        type: String, 
        required: true  
    },
    address: {
        firstName: { 
            type: String, 
            required: true 
        },
        lastName: { 
            type: String, 
            required: true 
        },
        emailAddress: { 
            type: String, 
            required: true 
        },
        phoneNo: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: true 
        },
        country: { 
            type: String, 
            required: true 
        },
        townCity: { 
            type: String, 
            required: true 
        },
        state: { 
            type: String, 
            required: true 
        },
        zipCode: { 
            type: String, 
            required: true 
        },
    },
    paymentMethod: { 
        type: String, 
        required: true  
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    productID: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    productDetails: {
        product: { 
            type: String, 
            required: true 
        },
        name: { 
            type: String, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        },
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
