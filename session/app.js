const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session');
const { urlencoded } = require('express');
const parseUrl = require('parseurl')
const MongoStore = require('connect-mongo');
const parseurl = require('parseurl');
const escapeHTML = require('escape-html');
var data = []
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

function authenticate(req, res, next) {
    if (req.session.user) next()
    else next('route')
}
app.get('/', authenticate, (req, res) => {
    res.send("Hi, " + escapeHTML(req.session.user)+ "!" +'<a href="/logout">Logout</a>')
})
app.get('/', (req, res) => {
res.send('<form action="/login" method="post">' +
    'Username: <input name="user"><br>' +
    'Password: <input name="pass" type="password"><br>' +
    '<input type="submit" text="Login"></form>')
})

app.post('/login', (req, res,next) => {
    const d = {user : req.body.user,password : req.body.password}
    data[data.length] = d;
    req.session.regenerate(function (err) {
        if(err) {
            next(err)
        }
        req.session.user = d.user
        req.session.save(function (err) {
            if (err) return err;
            res.redirect('/')
        })
        

   }) 
})

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