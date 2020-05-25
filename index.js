const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use('/',express.static(__dirname ));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.use('/api', require(`${__dirname}/controllers/api`));

app.use('/', require(`${__dirname}/controllers/routing`));


app.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});