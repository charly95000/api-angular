const mongoose = require('mongoose');

const genreSchema = mongoose.Schema(
    {
        nom: { type: String, required: true, unique:true },
        // userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {timestamps: true},
);

module.exports = mongoose.model('Genre', genreSchema);