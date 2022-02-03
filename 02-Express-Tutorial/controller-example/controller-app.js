const express = require("express");
const app = express();

const auth = require('./routes/auth');
const people = require('../controller-example/routes/auth')

app
  .use(express.static("../public"))
  .use([express.urlencoded({ extended: false }), express.json()])

  .use('/login', auth)
  .use('/api/people', people)
  .listen(3000, () => console.log("the server is running at port 3000"));
