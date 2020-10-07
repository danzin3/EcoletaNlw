import knex from '../database/connection';
import {Request,Response} from 'express';

class ItemsController {
    async index (request:Request, response:Response) {
        const items =  await knex('items').select('*');
        //Função que percorre todos os itens do banco e modifica da maneira que desejar...
        //e retorna esses itens do banco midificados para o variável serialized
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url:`http://127.0.0.1:3333/uploads/${item.image}`,
            };
        });
        
        return response.json(serializedItems)  
    }
}

export default ItemsController;