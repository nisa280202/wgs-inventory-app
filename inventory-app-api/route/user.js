const express = require('express')
const multer  = require('multer')
const { middleware } = require('../middleware/middleware')
const { SUPER_ADMIN } = require('../constant/constant')
const { getUsers, insertUser, updateUser, deleteUser } = require('../handler/user')

const router = express.Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder untuk menyimpan file upload
  },
  filename: function (req, file, cb) {
      // Menamai file sesuai dengan timestamp unik
      cb(null, Date.now() + '-' + file.originalname);
  }
})

const upload = multer({ storage: storage });

router.get('/', getUsers)
router.post('/', middleware([SUPER_ADMIN]), upload.single('picture'), insertUser)
router.put('/:id', middleware([SUPER_ADMIN]), upload.single('picture'), updateUser)
router.delete('/:id', middleware([SUPER_ADMIN]), deleteUser)

module.exports = router