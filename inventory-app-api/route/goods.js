const express = require('express')
const multer = require('multer')
const { middleware } = require('../middleware/middleware')
const { OFFICE_STAFF, WAREHOUSE_STAFF } = require('../constant/constant')
const { getAllGoods, insertGoods, updateGoods, deleteGoods, findGoods, getGoods } = require('../handler/goods')

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Folder untuk menyimpan file upload
    },
    filename: function (req, file, cb) {
      // Menamai file sesuai dengan timestamp unik
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', getAllGoods)
router.get('/:id', getGoods)
router.post('/', middleware([OFFICE_STAFF]), upload.single('picture'), insertGoods)
router.put('/:id', middleware([OFFICE_STAFF, WAREHOUSE_STAFF]), upload.single('picture'), updateGoods)
router.delete('/:id', middleware([OFFICE_STAFF]), deleteGoods)
router.get('/search', findGoods)

module.exports = router