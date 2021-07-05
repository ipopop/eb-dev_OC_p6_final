'use strict'

const fs = require('fs')

const Sauce = ({
  userId : { type : String, required : true},
  name : { type : String, required : true},
  manufacturer : { type : String, required : true},
  description : { type : String, required : true},
  mainPepper : { type : String, required : true},
  imageUrl : { type : String, required : true},
  heat : { type : Number, required : true },
})

exports.createOneSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce)
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
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