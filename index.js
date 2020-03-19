const express = require('express')
const app = express()
const port = 5000;
const apipath = '/apis';
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose');
var compression = require('compression');
var http = require('http');
var server = http.createServer(app);

app.use(cors())
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(compression())

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://127.0.0.1:27017/xupermax', { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.on('connected', () => {
    console.log("DataSoruce Connected.")
});

app.get('/', (req, res) => res.send('Download E-Accountant from App Store or Play Store!'))

server.listen(port, () => {
    console.log("Server Started On PORT -> " + port)
});

const userroute = require('./users/users')
app.use(apipath + '/users', userroute)

const fileroute = require('./image/image')
app.use(apipath + '/file', fileroute)
