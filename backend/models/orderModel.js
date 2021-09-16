import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderItems: [{
        name: {type: String, required: true},
        qty: {type: Number, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}
    }],
    shippingAddress: {
        fullName: {type: String, required: true},
        streetAddress: {type: String, required: true},
        suiteNumber: {type: String, default:''},
        city: {type: String, required: true},
        province: {type: String, required: true},
        postalCode: {type: String, required: true},
        phoneNumber: {type: String, default:''},
    },
    paymentMethod: {type: String, required: true},
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String
    },
    itemsPrice: {type: Number, required: true},
    shippingPrice: {type: Number, required: true},
    tax: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    isPaid: {type: Boolean, default: false},
    paidOn: {type: Date},
    isShipped: {type: Boolean, default: false},
    shippedOn: {type: Date}
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

