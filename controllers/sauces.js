'use strict'

const Sauce = require('../models/Sauce')
const fs = require('fs')

exports.createOneSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
    likes: Number(0),
    dislikes: Number(0),
    usersLiked: [],
    usersDisliked: []
  })
  sauce.save()
  .then(() => res.status(201).json({ message: 'Object stored'}))
  .catch(err => res.status(400).json({ error: err }))
}

exports.modifyOneSauce = (req, res) => {
  const itemID = req.params.id

  const sauceObject = req.file ?{
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    } : { ...req.body }

  Sauce.updateOne({ _id: itemID }, { ...sauceObject, _id: itemID })
    .then(() => res.status(200).json({ message: 'Object modified'}))
    .catch(err => res.status(400).json({ error: err }))
}

exports.deleteOneSauce = async (req, res, next) => {
  const itemID = req.params.id
  try {
    const sauce = await Sauce.findOne({ _id: itemID})
    const filename = await sauce.imageUrl.split('/image/')[1]
    fs.unlink(`image/${filename}`, () => {
      Sauce.deleteOne({ _id: itemID })
        .then(() => res.status(200).json({ message: 'Object deleted'}))
        .catch(err => res.status(400).json({ error: err }))
    })
  } catch (error) {
    res.status(500).json({ error: err })
  }
}

exports.getAllSauce = async (req, res, next) => {
  try {
    const sauces = await Sauce.find()
    res.status(200).json(sauces)
  } catch (err) {
    res.status(400).json({ error: err })
  }
}

exports.getOneSauce = async (req, res, next) => {
  try {
    const sauce = await Sauce.findOne({ _id: req.params.id })
    res.status(200).json(sauce)
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

exports.likeOrDislikeSauce = (req, res) => {  
  const itemID = req.params.id
  const userID = req.body.userId

  switch (req.body.like) {
    
    case 0:
      Sauce.findOne({ _id: itemID })
        .then((sauce) => {
          if (sauce.usersLiked.find(user => user === userID)) {
            Sauce.updateOne({ _id: itemID }, {
              $inc: { likes: Number(-1) },
              $pull: { usersLiked: userID },
              _id: itemID
            })
              .then(() => { res.status(201).json({ message: 'Like' }) })
              .catch((error) => { res.status(400).json({ error: error }) })
          }
          
          if (sauce.usersDisliked.find(user => user === userID)) {
            Sauce.updateOne({ _id: itemID }, {
              $inc: { dislikes: Number(-1) },
              $pull: { usersDisliked: userID },
              _id: itemID
            })
              .then(() => { res.status(201).json({ message: 'Dislike' }) })
              .catch((error) => { res.status(400).json({ error: error }) })
          }
        })
        .catch((error) => { res.status(404).json({ error: error }) })
      break

    case 1:
      Sauce.updateOne({ _id: itemID }, {
        $inc: { likes: Number(1) },
        $push: { usersLiked: userID },
        _id: itemID
      })
        .then(() => { res.status(201).json({ message: 'Like' }) })
        .catch((error) => { res.status(400).json({ error: error }) })
      break

    case -1:
      Sauce.updateOne({ _id: itemID }, {
        $inc: { dislikes: Number(1) },
        $push: { usersDisliked: userID },
        _id: itemID
      })
        .then(() => { res.status(201).json({ message: 'Dislike' }) })
        .catch((error) => { res.status(400).json({ error: error }) })
      break

    default:
      console.error('Bad request')
  }
}
