const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    published: {
        type: Number,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    genres: [
        { type: String}
    ]
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Book', schema)