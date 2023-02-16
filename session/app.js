const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const { urlencoded } = require('express');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.port || 3000;

const dbstring = 'mongodb://localhost:27017/tutorialDb'
const dboption = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}
const connection = mongoose.createConnection(dbstring, dboption)

app.use(express.json())
app.use(urlencoded({ extended: true }))

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl : dbstring ,collection : 'session'
    }),
    cookie: {
        maxAge : 60*10000,
    }
}))
app.get('/', (req, res) => {
    console.log(req.session)
    if (req.session.viewCount) {
        req.session.viewCount++;
    } else req.session.viewCount = 1;
    res.send(`<h1>you have visited this ${req.session.viewCount}</h1>`);
})
app.get('/done', (req, res) => {
    res.send("<h2>done page 2</h2>")
})
app.listen(port, () => {
    console.log(`server is running at ${port}`)
});