import knex from '../database/connection';
import {Request,Response} from 'express';

class PointsController {
    async index(request:Request,response:Response) {
        //Fazer filtro por cidade, uf e itens
        //Vai lidar com filtros sempre pega os parametros com request.query
        const {city, uf, items} = request.query;

        const parsedItems = String(items).split(',').map(item => Number(item.trim()));

        const points = await knex('points')
        .join('point_items','points.id', '=','point_items.point_id')
        .whereIn('point_items.item_id',parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*');
        
        return response.json(points)
    }

    async show(request:Request,response:Response) {
        const id = request.params.id;

        //A função fisrt seve para falar que o retorno é um único valor e não um array
        const point = await knex('points').where('id',id).first();

        if(!point) {
            return response.status(400).json({message: "Nenhum ponto foi encontrado"});
        }
        else {
            const items = await knex('items')
            .join('point_items','items.id','=','point_items.item_id')
            .where('point_items.point_id',id).select('items.title');

            return response.json({point, items});
        }
    }

    async create (request:Request,response:Response) {
        //Desestruturando o objeto body que vem do front_end
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
            image: 'Image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };
    
        //Quando o nome da coluna do banco e o nome da variável são iguais, basta colocar...
        //apenas o nome da variável que o knex já reconhece o insert.
        //Todo insert no knex retorna os ids das linhas que foram inseridas no banco de dados
        const ids = await trx('points').insert(point);
    
        const pointItems = items.map((item_id: Number) => {
            return {
                item_id,
                point_id: ids[0],
            };
        });
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: ids[0],
            ...point, //Retorna todos os campos do objeto point
        });
    }
}

export default PointsController;