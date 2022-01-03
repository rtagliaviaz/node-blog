const express = require('express')
const path = require('path')

const app = express()
const port = 3000


//settings
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

//middlewares
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"));

//routes
app.use(require('./routes/index'))



app.listen(port, () => console.log(`listening on port ${port}!`))