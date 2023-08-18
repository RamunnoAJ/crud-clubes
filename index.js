const express = require('express')
const expresshbs = require('express-handlebars')

const PORT = 8080

const app = express()
const hbs = expresshbs.create()

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.text('*/*'))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + 'uploads'))

app.get('/', (req, res) => {
  console.log('GET /')
  res.end('Hello world')
})

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
