const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

//Config Nunjucks
//The API for nunjucks covers rendering templates, adding filters and extensions, customizing template loading, and more.
//https://mozilla.github.io/nunjucks/api.html#configure
//'views' Views Folder .njk Nunjucks template files.
//autoescape (default: true) controls if output with dangerous characters are escaped automatically. See https://mozilla.github.io/nunjucks/api.html#autoescaping
//express an express app that nunjucks should install to
//watch (default: false) reload templates when they are changed (server-side). To use watch, make sure optional dependency chokidar is installed.

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.set('view engine', 'njk')
app.use(
  express.urlencoded({
    extended: false
  })
)

//Check the age if undefined go to form input this value
const checkAgeMiddleware = (req, res, next) => {
  const { age } = req.query
  if (!age) {
    return res.redirect('/')
  }
  return next()
}

//1 Default Route
app.get('/', (req, res) => {
  return res.render('index')
})

//Major Route
app.get('/major', checkAgeMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('major', { age })
})

//Minor Route
app.get('/minor', checkAgeMiddleware, (req, res) => {
  const { age } = req.query
  return res.render('minor', { age })
})

//Check Route, age redirect
app.post('/check', (req, res) => {
  const { age } = req.body

  if (age > 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})
//Define Server Port in this case port 3000, check in your brownser for http://127.0.0.1:3000
app.listen(3000)
