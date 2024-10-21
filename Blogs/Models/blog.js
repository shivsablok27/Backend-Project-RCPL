const mongoose  = require('mongoose')

let blogSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            trim: true,
            required: true
        },
        author:{
            type: String,
            trim: true,
            required: true
        },
        content:{
            type: String,
            trim : true
        }
    }
)
const blog = mongoose.model('Blog', blogSchema)
module.exports = blog
