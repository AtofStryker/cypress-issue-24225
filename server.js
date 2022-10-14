import 'dotenv/config.js'; // loads variables from .env file
import path from 'path';
import express from 'express';
import basicAuth from 'express-basic-auth';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(basicAuth({
  users: { 'admin': 'supersecret' }
}))

app.get('/', (req, res) => res.render('index'));

app.listen(3000);
