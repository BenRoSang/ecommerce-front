const { Schema, default: mongoose } = require("mongoose");


const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    },
    parentCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Category',
        required: false
    },
    properties: {
        type: Array,
        required: false
    }
});


const Category = mongoose.models.Category || mongoose.model('Category', categorySchema)
export default Category;