import express, { response } from 'express';
import PointsController from './controllers/pointsController';
import ItemsController from './controllers/itemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

//Retornar todos os items do banco
routes.get('/items', itemsController.index);


//Inserir os pontos no banco
routes.post('/points', pointsController.create);

//Retornar uma lista de pontos filtrados do banco
routes.get('/points', pointsController.index)

//Retornar um único ponto com o id passado como parametro na url pelo front
routes.get('/points/:id', pointsController.show); 

export default routes