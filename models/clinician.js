const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ClinicianSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    patient: [{
        type: String,
    }]
})

module.exports = mongoose.model("Clinician", ClinicianSchema);