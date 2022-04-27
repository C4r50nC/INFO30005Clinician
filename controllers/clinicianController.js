var Patient = require("../models/patient");
var Clinician = require("../models/clinician");
var Record = require("../models/record");

exports.patientsGet = async function (req, res) {
    if (!req.query.id) {
        res.redirect('/')
    } else {
        let clinician = await Clinician.findById(req.query.id)
        let patients = await Patient.find().lean().exec();
        let recordsId = Array.from(patients, x => x.record[x.record.length - 1])
        let records = await Record.find().where('_id').in(recordsId).lean().exec();
        for (i = 0; i < patients.length; i++) {
            records[i].patient = patients[i].username
        }
        // this part is for testing thresholds display
        records[0].bloodGlucoseLevelTooHigh = true;
        records[1].bloodGlucoseLevelTooHigh = false;
        records[0].dosesInsulinTakenTooHigh = false;
        records[1].dosesInsulinTakenTooHigh = true;
        //
        res.render('clinician', { username: clinician.username, patients: patients, records: records })
    }
}