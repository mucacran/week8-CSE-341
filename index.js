const express = require ('express');
const app = express();
require('dotenv').config();

const port = process.env.PORT
app.listen(port,()=>{
    console.log(`escuchando en el puerto ${port} pilas`);
});


const { auth,requiresAuth } = require('express-openid-connect');
app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    clientID: process.env.CLIENT_ID,
    baseURL: process.env.BASE_URL,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out')
}) ;

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

//https://github.com/auth0/express-openid-connect/blob/master/EXAMPLES.md