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
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  console.log('GET /')
  res.render('index', {})
})

app.listen(PORT)
console.log(`Listening on port ${PORT}`)
