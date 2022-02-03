const express = require("express");
const router = express.Router();

let { people } = require("../../data");

router
  .get("/", (req, res) => {
    res.status(200).json({ success: true, data: people });
  })

  .post("/", (req, res) => {
    const { name } = req.body;
    if (name) {
      people.push({ id: new Date().getTime(), name });
      return res.status(201).json({ person: name });
    }
    res.status(400).json({ success: false, msg: "please enter a name" });
  })

  .put("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const person = people.find((each) => {
      return each.id === id;
    });

    if (!person) {
      return res
        .status(400)
        .json({ success: false, msg: `no person with id ${id}` });
    }

    const newPeople = people.map((person) => {
      if (person.id === id) {
        person.name = name;
      }
      return person;
    });
    people = newPeople;
    res.status(202).json({ success: true, data: newPeople });
  })

  .delete("/:id", (req, res) => {
    const { id } = req.params;
    const person = people.find((each) => each.id == id);
    if (!person) {
      return res
        .status(400)
        .json({ success: false, msg: `no person with id ${id}` });
    }
    const newPeople = people.filter((person) => {
      return person.id !== Number(id);
    });
    people = newPeople;
    res.status(203).json({ success: true, data: newPeople });
  });
module.exports = router;
