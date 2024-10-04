const Citation = require('../models/citation');

// Create a new citation
exports.createCitation = async (req, res, next) => {
  try {

    const citation = new Citation({
      phrase: req.body.phrase,
      genreId: req.body.genreId

     
      // userId: req.body.userId
    });

    
    await citation.save();
    const populatedCitation = await Citation.findById(citation._id).populate('genreId');
    res.status(201).json(
      populatedCitation
    );
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create citation',
      error: error.message
    });
  }
};

exports.getAllCitations = async (req, res, next) => {
  try {
    const citations = await Citation.find().populate('genreId');
    res.status(200).json(citations);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve citations',
      error: error.message
    });
  }
};

// Retrieve a single citation by ID
exports.getOneCitation = async (req, res, next) => {
  try {
    const citation = await Citation.findOne({ _id: req.params.id }).populate('genreId');
    
    if (!citation) {
      return res.status(404).json({ message: 'Citation not found' });
    }

    res.status(200).json(citation);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to retrieve citation',
      error: error.message
    });
  }
};

exports.modifyCitation = async (req, res, next) => {
  try {

    const updatedCitation = {
      phrase: req.body.phrase,
    };

    const result = await Citation.findOneAndUpdate({ _id: req.params.id }, { $set: updatedCitation },{new:true}).populate('genreId');;

    if (!result) {
      return res.status(404).json({ message: 'Citation not found or no changes made' });
    }

    res.status(200).json(result );
  } catch (error) {
    res.status(400).json({
      message: 'Failed to update citation',
      error: error.message
    });
  }
};

exports.deleteCitation = async (req, res, next) => {
  try {
    const citation = await Citation.findOne({ _id: req.params.id });

    if (!citation) {
      return res.status(404).json({ message: 'Citation not found' });
    }

    // const filename = citation.imageUrl.split('/images/')[1];

    // fs.unlink(`images/${filename}`, async (unlinkError) => {
    //   if (unlinkError) {
    //     return res.status(500).json({ message: 'Failed to delete image', error: unlinkError.message });
    //   }

      await Citation.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Citation deleted successfully!' });
    // });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete citation',
      error: error.message
    });
  }
};