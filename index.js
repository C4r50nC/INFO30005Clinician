const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const auth = require('./routes/authentication');
const clinician = require('./routes/clinician')

const app = express()
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }))

const db = "mongodb+srv://INFO30005:CTzmUlR9wRhbksUS@cluster0.zrgl8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(db).then(() => console.log('MongoDB Connected...')).catch((err) => console.log(err));

app.use('/auth', auth);
app.use('/clinician', clinician)
app.use(express.static('public'))

var hbs = exphbs.create({ defaultLayout: 'main', extname: '.hbs' });
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.redirect('login');
});
app.get('/login', (req, res) => {
    res.render('login');
});
app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})