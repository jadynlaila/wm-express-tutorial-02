const express = require('express');
const app = express();

app.use(express.static('./public'));

app.all('*', (req, res) => {
    res.status(404).send(`<h1>Page Not Found</h1>`)
})

app.listen(3000, () => {
    console.log('server is listening at port 3000');
});

