const bcrypt = require('bcryptjs');
const store = require("store2");

var Clinician = require("../models/clinician");

exports.loginPost = function (req, res) {
    const { username, password } = req.body;
    Clinician.findOne({ username: username }).then((clinician) => {
        if (!clinician) {
            res.redirect('/login');
        } else {
            bcrypt.compare(password, clinician.password, (err, isMatch) => {
                if (isMatch) {
                    store.set('userId', clinician._id)
                    res.redirect('/clinician' + "?id=" + clinician._id)
                }
            })
        }
    })
}

exports.registerPost = function (req, res) {
    const { username, password } = req.body;
    Clinician.findOne({ username: username }).then((clinician) => {
        if (clinician) {
            res.status(409).alert({ error: 'Username already exists' });
        } else {
            const newClinician = new Clinician({
                username,
                password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newClinician.password, salt, (err, hash) => {
                    if (err) throw err;
                    newClinician.password = hash;
                    newClinician.save().then((clinician) => {
                        res.redirect('/login')
                    })
                })
            })
        }
    });
}