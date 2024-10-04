const Genre = require('../models/genre');
const fs = require('fs');

// Create a new genre
exports.createGenre = async (req, res, next) => {
  try {

    const genre = new Genre({
      nom: req.body.nom,
     
      // userId: req.body.userId
    });

    
    await genre.save();
    
    res.status(201).json(
      genre
    );
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create genre',
      error: error.message
    });
  }
};

exports.getAllGenres = async (req, res, next) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve genres',
      error: error.message
    });
  }
};

// Retrieve a single genre by ID
exports.getOneGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });
    
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    res.status(200).json(genre);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve genre',
      error: error.message
    });
  }
};

exports.modifyGenre = async (req, res, next) => {
  try {

    const updatedGenre = {
      nom: req.body.nom,
    };

    const result = await Genre.findOneAndUpdate({ _id: req.params.id }, { $set: updatedGenre },{new:true});

    if (!result) {
      return res.status(404).json({ message: 'Genre not found or no changes made' });
    }

    res.status(200).json(result );
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update genre',
      error: error.message
    });
  }
};

exports.deleteGenre = async (req, res, next) => {
  try {
    const genre = await Genre.findOne({ _id: req.params.id });

    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }

    // const filename = genre.imageUrl.split('/images/')[1];

    // fs.unlink(`images/${filename}`, async (unlinkError) => {
    //   if (unlinkError) {
    //     return res.status(500).json({ message: 'Failed to delete image', error: unlinkError.message });
    //   }

      await Genre.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Genre deleted successfully!' });
    // });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete genre',
      error: error.message
    });
  }
};