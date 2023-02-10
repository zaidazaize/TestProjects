const express = require("express")

const app = express()
app.set("view engine", "ejs")
app.use("/static", express.static("public"))
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res)=>{
    //if not authenticated
    res.redirect("/login")
    //else redirect to dashboard
})

app.get("/login", (req, res)=>{
    res.render("login", {valid:true})
})

app.post("/login", (req, res)=>{
    uname = req.body.username
    pass = req.body.password

    //check for valid user from database
    // i am hardcoding it
    isValid = true

    //redirect to dashboard if correct credentials
    if(isValid){
        res.redirect("/userdashboard")
    } else{
        context = {uname: uname, pass:pass, valid:false}
        res.render("login", context)
    }
})

app.get("/signup", (req, res)=>{
    res.render("signup", {valid:true})
})

app.post("/signup", (req, res)=>{
    uname = req.body.username
    pass = req.body.password1

    //register user to database
    //check for similar username or anything else ...
    isReg = true

    //redirect to login page if user registered succesfully
    if(isReg){
        context = {uname: uname, pass:pass, valid:true}
        res.render("login", context)
    } else{
        context = {uname: uname, pass:pass, valid:false}
        res.render("signup", context)
    }
})

app.get("/userdashboard", (req, res)=>{
    //if user is not authenticated redirect back to login page
    
    //server user dashboard only when authenticated
})

app.listen(3000, ()=>{
    console.log("App here: http://localhost:3000/")
})