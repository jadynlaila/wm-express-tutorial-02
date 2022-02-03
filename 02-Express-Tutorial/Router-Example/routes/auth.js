
const express = require('express');
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    res.status(201).send(`welcome ${name}`);
  } else {
    res.status(400).json({ success: false, msg: "please provide a name" });
  }
});


module.exports = router;
