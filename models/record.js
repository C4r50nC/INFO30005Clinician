const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RecordSchema = new Schema({
    patient: {
        type: String,
        required: true
    },
    bloodGlucoseLevel: {
        type: String,
    },
    weight: {
        type: String,
    },
    dosesInsulinTaken: {
        type: String,
    },
    exercise: {
        type: String,
    },
    message: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model("Record", RecordSchema);