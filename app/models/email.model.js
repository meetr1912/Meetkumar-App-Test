const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    EmailId: String,
    from: String,
    to: String,
    title: String,
    content: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Email', NoteSchema);