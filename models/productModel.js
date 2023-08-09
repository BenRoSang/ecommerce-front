const { Schema, default: mongoose } = require("mongoose");


const productSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: String,
        price: {
            type: Number,
            required: true
        },
        images: {
            type: Array,
            default: []
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: 'Category',
            required: false
        },
        productProperties: {
            type: Object,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;