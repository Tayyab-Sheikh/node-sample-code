const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: {
      type:  mongoose.Schema.Types.ObjectId
    },
    product: { 
        type:[mongoose.Schema.Types.ObjectId], 
        ref: 'Product', 
        required: true,
        default:[] 
    },
    quantity: { 
        type: Number, 
        default: 1 
    }
});

module.exports = mongoose.model('Order', orderSchema);