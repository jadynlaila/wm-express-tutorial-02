const express = require("express");
const app = express();
let { people } = require("./data");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (name) {
    people.push({ id: new Date().getTime(), name });
    return res.status(201).json({ person: name });
  }
  res.status(400).json({ success: false, msg: "please enter a name" });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  const { name } = req.body;
  if (name) {
    res.status(201).send(`welcome ${name}`);
  } else {
    res.status(400).json({ success: false, msg: "please provide a name" });
  }
});


app.put('/api/people/:id', (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    const person = people.find((each) => {
        return each.id == id 
    })

    if(!person){
        return res.status(400).json({success: false, msg: `no person with id ${id}`})
    }

    const newPeople = people.map((person) => {
        if(person.id == id){
            person.name = name
        }
        return person
    })
    people = newPeople;
    res.status(202).json({success: true, data: newPeople})
})


app.delete('/api/people/:id', (req, res) => {
    const {id} = req.params;
    const person = people.find((each) => each.id == id);
    if(!person){
        return res.status(400).json({success: false, msg: `no person with id ${id}`})
    }
    const newPeople = people.filter((person) => {
        return person.id !== Number(id)
    })
    people = newPeople;
    res.status(203).json({success: true, data: newPeople})
})

app.listen(3000, () => console.log("server is listening at port 3000"));
