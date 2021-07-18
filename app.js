const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('./node_modules/body-parser')

const app = express()
const port = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]

app.get('/', (req, res) => {
  res.redirect('./login')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  console.log(`email:${email} password:${password}`)
  const found = users.find(user => user.email === email)
  if (found) {
    if (found.password === password) {
      console.log(`Welcome ${found.firstName}`)
      res.render('welcome', { name: found.firstName })
    }
    else {
      res.render('login', { msg: 'Invalid password' })
    }
  } else {
    res.render('login', { msg: 'User not found' })
  }
})

app.listen(port, () => {
  console.log(`Server is up @ port ${port}`)
})