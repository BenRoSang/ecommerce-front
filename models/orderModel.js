const { Schema, default: mongoose } = require("mongoose");


const OrderSchema = new Schema({
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postal: String,
    address: String,
    country: String,
    paid: Boolean,
},
{
    timestamps: true
}
)

export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema)
