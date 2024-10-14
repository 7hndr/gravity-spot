import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Максимум 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|webp/
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimeType = fileTypes.test(file.mimetype)

    if (extname && mimeType) {
      return cb(null, true)
    } else {
      cb(new Error('Images only!'))
    }
  }
})
