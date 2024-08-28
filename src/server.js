const app = require('./app.js');
const bodyParser = require('body-parser');

const port = 5001;
app.listen(port);
app.use(bodyParser.json());
console.log(`Aplicação rodando na porta ${port}`);
