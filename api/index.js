import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});


const app = express();

app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.set('views', path.join(__dirname, '..', 'view'));

app.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Sistema Teste',
    mensagem: 'Aplicacao rodando',
    data: new Date().toLocaleString('pt-BR')
  });
});

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Servidor local rodando em http://localhost:${port}`);
  });
}

export default app;
