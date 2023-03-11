const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

