'use strict'

const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => { callback(null, 'image') },
  filename: (req, file, callback) => {
    const name = file.originalname.split('.')[0]
    const ext = MIME_TYPES[file.mimetype]
    callback(null, name + '_' + Date.now() + '.' + ext)
  }
})

module.exports = multer({storage: storage}).single('image')
