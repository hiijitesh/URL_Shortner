const express = require('express')
const PORT = process.env.PORT || 8000
const mongoose = require('mongoose')
const shorturl = require('./model/url_model')

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://root:jiteshroot@cluster0.vmhhvjq.mongodb.net/URL_Shortner?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.set('view engine', 'ejs ')
app.use(express.urlencoded({ extended: false }))


app.get('/', async (req, res) => {

    const shortURL = await shorturl.find()
    res.render('index', { shortURL: shorturl })
})

app.post('/urlshortner', async (req, res) => {
    await shorturl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shorturl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(PORT, () => {
    console.log(`server is running on the port ${PORT}`)
})


// Mongo_URL = "mongodb + srv://root:jiteshroot@cluster0.vmhhvjq.mongodb.net/URL_Shortner?retryWrites=true&w=majority"