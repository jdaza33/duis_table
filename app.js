const express = require('express');
const nedb = require('nedb');

const port = process.env.PORT || 8020;

const app = express();

// Database
let db = new Datastore({ filename: './data.db', autoload: true });

//Static
app.use(express.static(__dirname + '/dist/'));

//Output
app.listen(port, () => {
console.log(`Server on port ${port}`);
});

