const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite')

router.post('/favoriteNumber', (req, res) => {

    //mongoDB에서 favorite 숫자 가져오기
    Favorite.find({"movieId": req.body.movieId})
    .exec().then(function(info) {
        //그다음에 프론트에 다시 숫자 정보를 보내주기
        res.status(200).json({success: true, favoriteNumber: info.length})
    }).catch(function(err) {
        return res.status(400).send(err)
    })

})

router.post('/favorited', (req, res) => {

    //내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기

    //mongoDB에서 favorite 숫자 가져오기
    Favorite.find({"movieId": req.body.movieId, "userFrom" : req.body.userFrom})
    .exec().then(function(info) { 
        //그 다음에 프론트에 다시 숫자 정보 보내주기
        
        let result = false;
        if(info.length !== 0) {
            result = true
        }
    
        res.status(200).json({success: true, favorited: result})

    }).catch(function(err) {
        return res.status(400).send(err)
    })

})

router.post('/removeFromFavorite', (req, res) => {
    Favorite.findOneAndDelete({ moveId: req.body.movieId, userFrom: req.body.userFrom })
    .exec().then(function(doc) {
        res.status(200).json({ success: true, doc })
    }).catch(function(err) {
        return res.status(400).send(err)
    })
})

router.post('/addToFavorite', (req, res) => {

    const favorite = new Favorite(req.body)

    favorite.save().then(() => {
        res.status(200).json({success: true})
    }).catch((err) => {
        return res.status(400).send(err)
    })
    
})

//다른 곳에서도 User 모델 사용할 수 있게 export함
module.exports = router;