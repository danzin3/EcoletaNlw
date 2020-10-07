import express, { json, request, response } from 'express';
import cors from 'cors';
import routes from './routes';
import path from 'path';

const app = express();

app.use(cors());

//Faz o app reconhecer estruturas (Objetos) enviadas do front end via JSON
app.use(express.json());

app.use(routes);

app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')));



//listen inicia o servidor, o param é a porta da placa de rede em que se deseja rodar o server
app.listen(3333);