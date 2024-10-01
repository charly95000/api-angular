const Article = require('../models/article');
const fs = require('fs');

// Create a new article
exports.createArticle = async (req, res, next) => {
  try {
    const imageUrl = req.file ? `http://localhost:8080/images/${req.file.filename}` : null;

    const article = new Article({
      title: req.body.title,
      description: req.body.description,
      imageUrl: imageUrl,
      // userId: req.body.userId
    });

    console.log(article);
    await article.save();
    
    res.status(201).json({
      message: 'Post saved successfully!',
      article: article
    });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create article',
      error: error.message
    });
  }
};

exports.getAllArticles = async (req, res, next) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve articles',
      error: error.message
    });
  }
};

// Retrieve a single article by ID
exports.getOneArticle = async (req, res, next) => {
  try {
    const article = await Article.findOne({ _id: req.params.id });
    
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve article',
      error: error.message
    });
  }
};

exports.modifyArticle = async (req, res, next) => {
  try {

    const updatedArticle = {
      title: req.body.title,
      description: req.body.description
    };

    const result = await Article.updateOne({ _id: req.params.id }, { $set: updatedArticle });

    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Article not found or no changes made' });
    }

    res.status(200).json({ message: 'Article updated successfully!' });
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update article',
      error: error.message
    });
  }
};