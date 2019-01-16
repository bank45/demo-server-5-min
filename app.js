const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.static('public'))
const port = 3000;

const hbsFileContent = fs.readFileSync(path.join(process.cwd(), 'index.hbs'), 'utf8');
const template = handlebars.compile(hbsFileContent);
const context = {
    title: 'My New App!',
    body: 'Hello World!'
};

app.get('/', (req, res) => res.send(template(context)));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
