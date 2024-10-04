const mongoose = require('mongoose');

const citationSchema = mongoose.Schema(
    {
        phrase: { type: String, required: true, unique:true },
        genreId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'Genre' },
        // userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {timestamps: true},
);

module.exports = mongoose.model('Citation', citationSchema);