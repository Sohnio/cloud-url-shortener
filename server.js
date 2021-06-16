const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
let urlTools = require('./urlTools');

const app = express()

mongoose.connect('mongodb://mongo:27017/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  
  if (urlTools.isValidURL(req.body.fullUrl)) await ShortUrl.create({ full: req.body.fullUrl, short: urlTools.getShortenUrl() })
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 5000);

  module.exports = app