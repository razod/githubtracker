const express = require('express');
const fetch = require('node-fetch');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', async (req, res) => {
  var id = req.params.id;
  const api = await fetch(`https://ghapi.huchen.dev/`);
  if(!api) {
    return res.status(400).send('Error getting repos..')
  }
  const json = await api.json();
  if(json.message) {
    return res.render('error', {
      error: json.message,
      errormsg: 'Error (from Github)'
    })
  }
      res.render('trending', {
        json
      })
});

app.get('/u/:id', async (req, res) => {
  var id = req.params.id;
  const api = await fetch(`https://api.github.com/users/${id}/repos`);
  if(!api) {
    return res.status(400).send('Error getting repos..')
  }
  const json = await api.json();
  if(json == '') {
    return res.render('error', {
      error: `The user ${id} has no repositories.`,
      errormsg: 'No repositories'
    })};
  if(json.message) {
    return res.render('error', {
      error: json.message,
      errormsg: 'Error (from Github)'
    })
  }
      res.render('index', {
        json,
        name: id
      })
});


app.listen(4000, console.log('http://localhost:4000'));