const multer = require ('multer')
const path = require ('path')
const MAX_SIZE = 5000000
const fs = require('fs')

const storage = multer.diskStorage({
    destination: (req, fill, cb) => {
        cb(null, './statics')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    if (file.nametype == 'image/jpeg' || file.nametype === 'image.png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const upload = multer ({
    storage: storage,
    limit: {
        fileSize: MAX_SIZE
    }
})

const cekNull = (fileUpload) => {
    if (fileUpload === undefined || fileUpload === null) {
        return null
    } else {
        return fileUpload[0].filename
    }
}

const deleteImage = (image) => {
    fs.unlinkSync(`./statics/${image}`)
}

module.exports = {multer, upload, cekNull, deleteImage}