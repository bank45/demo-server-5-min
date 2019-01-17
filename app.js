const express = require('express');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies

const port = 3000;

let cats = [
    {
        name: 'Fluffy',
        age: '2'
    },
    {
        name: 'Smelly',
        age: '5'
    }
];

const hbsFileContent = fs.readFileSync(path.join(process.cwd(), 'index.hbs'), 'utf8');
const template = handlebars.compile(hbsFileContent);
const context = {
    title: 'My New App!',
    body: 'Hello World!',
    cats
};

app.get('/', (req, res) => res.send(template(context)));

app.post('/cats', (req, res) => {
    const body = req.body;
    console.log('body', body);
    cats.push({
        name: body.catName,
        age: body.catAge
    });
    res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
