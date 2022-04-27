const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var PatientSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    record: [{
        type: String
    }]
})

module.exports = mongoose.model("Patient", PatientSchema);