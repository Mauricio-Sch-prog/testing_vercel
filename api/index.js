import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import {configDotenv} from "dotenv";
import cookieParser from "cookie-parser";

configDotenv()

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, '..', 'view'));

app.get('/', (req, res) => {

  if(!req.cookies?.["auth"]) return res.redirect("/login")

  res.render('index', {
    titulo: 'Sistema Teste',
    mensagem: 'Aplicacao rodando',
    data: new Date().toLocaleString('pt-BR')
  });
});

app.get('/login', (req, res) => {
  
  
  res.render('login');
});

app.get('/register', (req, res) => {
  

  res.render('register');
});


app.post('/login', (req, res) => {
  const {name, email, password} = req.body;

  const data = {}

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.cookie("auth", data, options).redirect('/');
});

app.post('/register', (req, res) => {
  const {email, password} = req.body;

  res.redirect('/login');
});



if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Servidor local rodando em http://localhost:${port}`);
  });
}

export default app;
