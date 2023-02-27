const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const { urlencoded } = require('express');
const parseUrl = require('parseurl')
const MongoStore = require('connect-mongo');
const parseurl = require('parseurl');

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
        maxAge: 60 * 10000,
        httpOnly:true
    }
}))

/** Fror counting the no of visits on each page */
// app.use(function (req, res, next) {
//     if (!req.session.views) {
//         console.log("Initializing views")
//         req.session.views = {}
//     }
//     var pathname = parseurl(req).pathname
//     req.session.views[pathname] = (req.session.views[pathname] || 0) +1
//     next()
// })

app.get('/one', (req, res) => {
    // console.log(req)
    
    res.send(`<h1>you have visited this ${req.session.views['/one']}</h1>`);
})
app.get('/done', (req, res) => {
    res.send(`<h1>you have visited this ${req.session.views['/done']}</h1>`);
})
app.get('/logout', (req, res) => {
    req.session.destroy()
    res.send("logout")
    
})
app.listen(port, () => {
    console.log(`server is running at ${port}`)
});