const mongoose = require('mongoose');

const articleSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        imageUrl: { type: String, required: true },
        // userId: { type:mongoose.Schema.Types.ObjectId, required: true, ref: 'User' }
    },
    {timestamps: true},
);

module.exports = mongoose.model('Article', articleSchema);