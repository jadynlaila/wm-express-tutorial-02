const express = require('express');
const app = express();

app.get('/', (req, res) => {
    console.log('serving home page');
    res.status(200).send("Home page")
})

app.all('*', (req, res) => {
    res.status(404).send(`<h1>Page Not Found</h1>`)
})

app.listen(3000, () => {
    console.log('server is listening at port 3000');
});

