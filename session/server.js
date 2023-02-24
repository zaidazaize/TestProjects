const express = require('express')


const app = express();
app.use(express.json())

app.set('view-engine','ejs')
app.use(express.static('public'))
app.get('/', (req, res) => {
    console.log(req.body)
    res.render('login')
})
app.listen(3000, () => {
    console.log('server started');
})