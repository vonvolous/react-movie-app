const mongoose = require('mongoose');
const Schema = mongoose.Schema

const favoriteSchema = mongoose.Schema({
    userFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    movieId: {
        type: String
    },
    movieTitle: {
        type: String
    },
    moviePost: {
        type: String
    },
    movieRunTime: {
        type: String
    }
}, {timeStamps: true})

const Favorite = mongoose.model('Favorite', favoriteSchema)

//다른 곳에서도 Favorite 모델 사용할 수 있게 export함
module.exports = { Favorite }