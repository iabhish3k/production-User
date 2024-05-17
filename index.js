const express = require('express')
const colors = require("colors");
const bodyParser = require('body-parser')
var cors = require('cors')
const app = express()
const connectDB = require('./db/index')
const router = require('./router/index')
const morgan = require('morgan')
require('dotenv').config();
const path = require("path");
const port = 3000

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, 'client/dist')));

// Catch-all route to serve index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.use(cors())
app.use(morgan("dev"))
app.use(express.json());


app.use(router)

    connectDB().then(()=>{
        app.listen(port, () => {
            console.log(`App listening on port ${port}`.bgCyan.white)
          })
    }).catch((err)=>{
        console.log(err);
    })


    

