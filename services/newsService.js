const News = require('../models/news');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const { uploadSingleImage } = require('../middlewares/uploadImageMiddleware');

exports.uploadNewsImage = uploadSingleImage('image');

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `news-${uuidv4()}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat('jpeg')
    .jpeg({ quality: 95 })
    .toFile(`uploads/news/${filename}`);

  req.body.image = filename;
  next();
});


// @desc  create news
// @route POST  /api/v1/news
// @access PRIVATE

exports.createNews = asyncHandler(async (req, res, next) => {
  const { title, details, date, image } = req.body;
  const news = await News.create({ title, details, date, image });
  res.status(201).json({ data: news });
});

// @desc  Get list of news
// @route GET  /api/v1/news
// @access Public

exports.getAllNews = asyncHandler(async (req, res, next) => {
  const news = await News.find();
  res.status(200).json({ data: news });
});

// @desc  Get a single news
// @route GET  /api/v1/news/{id}
// @access Public


exports.getNewsById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findById(id);
  if (!news) {
    return res.status(404).json({ error: 'News item not found' });
  }

  res.status(200).json({ data: news });
});

// @desc  Update news
// @route PUT  /api/v1/news
// @access Private
exports.updateNews = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { title, details, date, image } = req.body;
  const news = await News.findByIdAndUpdate(id, { title, details, date, image }, { new: true });
  if (!news) {
    return res.status(404).json({ error: 'News item not found' });
  }
  res.status(200).json({ data: news });
});


// @desc  Delete news
// @route DELETE  /api/v1/news/{id}
// @access Private

exports.deleteNews = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const news = await News.findByIdAndDelete(id);
  if (!news) {
    return res.status(404).json({ error: 'News item not found' });
  }
  res.status(200).json({ message: 'News item deleted successfully' });
});
