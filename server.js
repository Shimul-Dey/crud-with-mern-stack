const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const items = require('./routes/api/items');
const path = require('path');
const app = express();

// bodyparser middleware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

mongoose.connect(db)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// user routes 
app.use('/api/items', items);

// server static assets if in production 
if(process.env.NODE_ENV === 'PRODUCTION'){
    app.use(express.static('client/build'));

    app.get('*',( req,res) => {
        res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

    const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));