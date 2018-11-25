const express = require('express');
const cors = require('cors');
const Pusher = require('pusher');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const Chatkit = require('@pusher/chatkit-server')
const fs = require('file-system')

const port = process.env.PORT || 8020;

const app = express();

//PATH
const PUSHER_APP_ID = '629361'
const PUSHER_APP_KEY = '0f5f2bf6cc6d01e862a4'
const PUSHER_APP_SECRET = 'a9f057161b4b7a3f3f68'
const PUSHER_APP_CLUSTER = 'us2'

const chatkit = new Chatkit.default({
	instanceLocator: 'v1:us1:8bd51fc5-238c-41f3-9cf4-d998d087171b',
	key: 'eea44c7e-758b-4bd1-a80f-dc653bd998b6:wiY1M8QhAbrA+7xKV/eE72crcO3cA8W0BTCknb5jL2k=',
})


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

app.post('/paint', (req, res) => {
	pusher.trigger('painting', 'draw', req.body);
	res.json(req.body);
});

//Chatkit pusher

app.post('/chatkit/token', (req, res) => {
	const authData = chatkit.authenticate({
		userId: req.query.user_id
	});

	res.status(authData.status)
		.send(authData.body);
})

app.post('/user/create', (req, res) => {
	let user = req.body
	chatkit.createUser({
		id: user.id,
		name: user.name,
	})
		.then(() => {
			console.log('User created successfully');
			res.json({
				res: true,
				message: 'Usuario creado'
			})
		})
		.catch((err) => {
			console.log(err);
			res.json({
				res: false,
				message: 'Usuario no creado',
				err
			})
		});
})

app.get('/user/:id', (req, res) => {
	chatkit.getUser({
		id: req.params.id,
	})
		.then(user => {
			res.json({
				res: true,
				user
			})
		})
		.catch(err => {
			res.json({
				res: false
			})
			console.error(err)
		})
})

/*app.get('/user/:id', async (req, res) => {
	let userId = req.params.id
	await db.find({_id: userId}, (err, doc) => {
        if(err) console.log(err)
        console.log(doc);
        res.json({
            doc
        });
    });
})*/

app.post('/room/new', (req, res) => {
	let room = req.body
	chatkit.createRoom({
		creatorId: room.userId,
		name: room.name,
	})
		.then(response => {
			console.log('Room created successfully');
			res.json({
				res: true,
				roomId: response.id,
				message: 'Clase creada'
			})
		})
		.catch((err) => {
			console.log(err);
			res.json({
				res: false,
				message: 'Clase no creada',
				err
			})
		});
})

app.post('/room/add/users', (req, res) => {
	let data = req.body
	chatkit.addUsersToRoom({
		roomId: data.roomId,
		userIds: [data.userId]
	})
		.then(() => {
			console.log('user added')
			res.json({
				res: true,
				message: "Added"
			})
		})
		.catch(err => {
			res.json({
				res: false
			})
			console.error(err)
		})
})

app.post('/message/send', (req, res) => {
	let message = req.body
	chatkit.sendMessage({
		userId: message.userId,
		roomId: message.roomId,
		text: message.message,
	})
		.then(response => {
			console.log('sent message with id', response.id)
			res.json({
				res: true,
				message: 'Mensaje enviado'
			})
		})
		.catch(err => {
			console.error(err)
			res.json({
				res: true,
				message: 'Mensaje enviado'
			})
		})
})

app.get('/message/received/:roomId', (req, res) => {

	chatkit.getRoomMessages({
		roomId: req.params.roomId,
		limit: 100,
	})
		.then(messages => {
			console.log('got last 10 messages')
			for (let m of messages) {
				renderMessage(m)
			}
			return chatkit.getRoomMessages({
				roomId: req.params.roomId,
				initialId: res[messages.length - 1].id,
			})
		})
		.then(moreMessages => {
			console.log('got the next 10 messages before them')
			for (let m of moreMessages) {
				renderMessage(m)
			}
		})
		.catch(err => console.error(err))
})

//nedb
app.post('/class/new', (req, res) => {
	let data = req.body
	db.insert(data, (err, doc) => {
		if (err) {
			console.log('ERROR', err)
		}
		//console.log('Clase creada --> ', doc)
		res.json({
			res: true
		})
	});
})

app.get('/class', async (req, res) => {
	await db.find({}, (err, doc) => {
		if (err) console.log(err)
		//console.log(doc);
		res.json({
			res: true,
			class: doc
		});
	});
});

app.delete('/class/:id', async (req, res) => {
	await db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
		if (err) {
			console.log(err)
			res.json({
				res: false
			})
		}

		console.log(`Registro eliminado --> ${numRemoved}`)
		res.json({
			res: true
		})
	})
})


//Download files
app.post('/download', async (req, res) => {
	let path = `${__dirname}/files`
	let data = req.body
	await fs.mkdir(path, (err) => {
		if(err){
			console.log(err)
		}else{
			fs.writeFile(`${path}/file.${data.ext}`, data.text, async (errr) => {
				if (errr) {
					console.log('Error al crear archivo', errr);
				} else {
					console.log('Archivo creado con exito');
					res.download(`${path}/file.${data.ext}`, (err) => {
						if(err) console.log(err)
					})
					//await fs.rmdirSync(path);
				}
			});
		}
	});
	
})


//Output
app.listen(port, () => {
	console.log(`Server on port ${port}`);
});

