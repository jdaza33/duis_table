const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const bodyParser = require('body-parser');
const Datastore = require('nedb');

const port = process.env.PORT || 8020;

const app = express();

//PATH
const PUSHER_APP_ID = '629361'
const PUSHER_APP_KEY = '0f5f2bf6cc6d01e862a4'
const PUSHER_APP_SECRET = 'a9f057161b4b7a3f3f68'
const PUSHER_APP_CLUSTER = 'us2'

// Database
let db = new Datastore({ filename: './data.db', autoload: true });


//Config
app.use(cors())
//app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const pusher = new Pusher({
     appId: PUSHER_APP_ID,
     key: PUSHER_APP_KEY,
     secret: PUSHER_APP_SECRET,
     cluster: PUSHER_APP_CLUSTER,
     encrypted: true
});

//Static
app.use(express.static(__dirname + '/dist/'));

//API

//Pusher 
app.post('/pusher/auth', function (req, res) {
     let socketId = req.body.socket_id;
     let channel = req.body.channel_name;
     console.log(socketId, channel)
     var auth = pusher.authenticate(socketId, channel);
     res.send(auth);
});

//nedb
app.post('/class/new', (req, res) => {
	let data = req.body
    db.insert(data, (err, doc) => {
        if(err){
            console.log('ERROR', err)
        }
        console.log('Clase creada --> ', doc)
    });
})

app.get('/class', async (req, res) => {
    await db.find({}, (err, doc) => {
        if(err) console.log(err)
        console.log(doc);
        res.json({
            res: true,
            class: doc
        });
    });
  });


//Output
app.listen(port, () => {
console.log(`Server on port ${port}`);
});

