const express = require('express');
const port = process.env.port || 3000;
const app = express();

const mid = function (req, res, next) {
    console.log("this is mid 1");
    const err = Error("hi this is error");
    next(err)
}
const mid2 = function (req, res, next) {
    console.log("this is mid 2");
    next()
}
const mid3 = function (req, res, next) {
    console.log("this is mid 3");
    next()
}
const rootl = (req, res, next)=>{
    res.send("<h1>this is hello world</h1>")
}
const rootl2 = (req, res, next)=>{
res.send("<h1>this is hello world 2</h1>")
}
const errorhandler = function (err, req, res, next) {
    if (err) {
        res.send("<h1>Try again later</h1>")
    }
}
app.use(mid);

app.get('/',mid2, rootl)
app.get('/2',mid3,rootl2)
app.use(errorhandler)
app.listen(port ,() => {
    console.log(`listening on port ${port}`)
})