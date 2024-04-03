const express = require('express');
const router = express.Router();
const { createNewsValidator, updateNewsValidator, deleteNewsValidator } = require('../validators/newsValidator');
const {
  uploadNewsImage,
  resizeImage,
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews
} = require('../services/newsService');

router.post('/', uploadNewsImage, resizeImage, createNewsValidator, createNews);

router.get('/', getAllNews);

router.get('/:id', getNewsById);

router.put('/:id', uploadNewsImage, resizeImage, updateNewsValidator, updateNews);

router.delete('/:id', deleteNewsValidator, deleteNews);

module.exports = router;
