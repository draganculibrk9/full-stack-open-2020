const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favouriteGenre: {
        type: String,
        required: true
    }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)