const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4
    },
    born: {
        type: Number,
    },
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Author', schema)