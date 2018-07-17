const path = require('path')

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use( bodyParser.urlencoded({ extended: true }));
app.use( bodyParser.json());

app.use(express.static(path.join(__dirname, 'public/dist/public')));

require('./server/config/mongoose.js')

require('./server/models/task.js');

require('./server/config/routes.js')(app);

app.listen(1337);