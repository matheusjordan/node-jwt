// bibliotecas do jwt
require("dotenv-safe").config({example: ".env"});
const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next) {
    const token = req.headers['auth-access-token'];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
}

function setJWT(req, res, next) {
    const id = 1; //esse id viria do banco de dados
    const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
    });
    res.locals.token = token;
    next()
}


module.exports = {
    verifyJWT,
    setJWT
}