const express = require('express')
const Datastore = require('nedb')
const cors = require('cors')

const port = process.env.PORT || 8020

const app = express()

//Config
app.use(express.json())
app.use(cors())


// Database
let db = new Datastore({ filename: './data.db', autoload: true })

// Static
app.use(express.static(__dirname + '/dist/'))


// Router
app.post('/class', async (req, res) => {
  console.log('New Class --> ')
  console.log(req.body)

  let data = req.body;

  //Model
  let model = {
    name: data.name,
    teacher: data.teacher,
    topic: data.topic,
    apiKey: data.apiKey,
    token: data.token,
    sessionId: data.sessionId,
    date_start: data.date_start,
    date_end: data.date_end
  }

  await db.insert(model, (err, doc) => {
    console.log(doc)
  })
  res.json({
    res: true,
    message: 'Clase creada'
  })
})

app.get('/class', async (req, res) => {
  await db.find({}, (err, doc) => {
    console.log(doc)
    res.json({
      res: true,
      class: doc
    })
  })
})

// Output
app.listen(port, () => {
  console.log(`Server on port ${port}`)
})
