// importado função que intercepta requisicoes
const {  verifyJWT, setJWT } = require('./auth-incerceptor');

//index.js
const http = require('http'); 
const express = require('express'); 
const app = express(); 
 
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    res.json({message: "Tudo ok por aqui!"});
})

app.get('/clientes', verifyJWT,(req, res, next) => { 
    console.log("Retornou todos clientes!");
    res.json([{id:1,nome:'luiz'}]);
})

// autenticação
app.post('/login', setJWT, (req, res, next) => {
    //esse teste abaixo deve ser feito no seu banco de dados
    if(req.body.user === 'teste' && req.body.password === 'teste'){
      //auth ok
      const token = res.locals.token;
      return res.json({ auth: true, token: token });
    }
    
    res.status(500).json({message: 'Login inválido!'});
})

const server = http.createServer(app); 
server.listen(3000);
console.log("Servidor escutando na porta 3000...")