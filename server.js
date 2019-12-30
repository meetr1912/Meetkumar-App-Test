const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Email application."});
});


require('./app/routes/email.routes.js')(app);

// listen for requests
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});





// Spam filter - Sample implementation of Spam filter on the current email data
// Doesn't provide the reason as to why exactly it is classified as spam. 
const filter = require('spam-filter')('fisher')
const newMessages = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'good'],
  ['Donec faucibus vulputate feugiat.', 'bad'],
  ['Duis eu sapien nec elit consectetur convallis.', 'good']
]


filter.empty()
newMessages.forEach(function (newMessage) {
  filter.train(newMessage[0], newMessage[1])
})
filter.setMinimum('bad', 0.65).save()
