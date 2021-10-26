const express = require("express")
const router = express.Router()


router.get('/', function (req, res) {
    res.send('GET request to the user')
  })
  router.post('/', function (req, res) {
    res.send('POST request to the user')
  })


module.exports=router 
