var Patient = require("../models/patient");
var Clinician = require("../models/clinician");
var Record = require("../models/record");
const { range } = require("express/lib/request");

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
        for (i = 0; i < records.length; i++) {
            if (records[i].bloodGlucoseLevel > 6) {
                records[i].bloodGlucoseLevelTooHigh = true
            }
            if (records[i].dosesInsulinTaken > 4) {
                records[i].dosesInsulinTakenTooHigh = true;
            }
            if (records[i].weight > 75){
                records[i].weightTooHigh = true;
            }
            if (records[i].exercise < 8000){
                records[i].exerciseUnqualified = true;
            }
        }
        
        res.render('clinician', { username: clinician.username, patients: patients, records: records })
    }
}