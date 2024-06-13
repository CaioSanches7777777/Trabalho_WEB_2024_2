/** @type{import('fastify').FastifyPluginAsync<>} */

import habitats from './habitats.js';
import diets from './diets.js';

export default async function species(app, options) {

    const species = app.mongo.db.collection('species');
    const animals = app.mongo.db.collection('animals');


    app.get('/species', 
        {   
            //para exigir autenticação
            config: {
                logMe: true,
                //requireAuthentication: true
            }
        }, 
        async (request, reply) => {
            request.log.info(species);
        return await species.find().toArray();
    });

    //ajeitar para incluir imagem, atualizar a quantidade a cada novo animal
    app.post('/species', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    qtd: { type: 'integer' },
                    habitat: { type: 'string' },
                    diet: { type: 'string' },
                    img_url: { type: 'string' }
                },
                required: ['name', 'qtd', 'habitat', 'diet']
            }
        },config:{
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let specie = request.body;
        let result = await species.insertOne(specie);
        request.log.info(`Including specie ${specie.type}.`);
        return reply.code(201).send();
    });

    //ajeitar para buscar dietas da espécie
/*    app.get('/species/:id/diets', async (request, reply) => {
        let id = request.params.id;
        let specie = await diets.findOne({_id: new app.mongo.ObjectId(id)});
        let SpecieType = specie.type;
        let speciesDiet = await species.find({diet: DietType}).toArray();
        return speciesDiet; 
    });
*/

    app.get('/species/:id/animals',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        let specie = await species.findOne({_id: new app.mongo.ObjectId(id)});
        let animalSpecie = specie.name;
        let speciesDiet = await animals.find({species: animalSpecie}).toArray();
        return speciesDiet; 
    });


/*
    //ajeitar para buscar habitats da espécie
    app.get('/species/:id/diets', async (request, reply) => {
        let id = request.params.id;
        let specie = await diets.findOne({_id: new app.mongo.ObjectId(id)});
        let SpecieType = specie.type;
        let speciesDiet = await species.find({diet: DietType}).toArray();
        return speciesDiet; 
    });
*/
    app.get('/species/:id',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        let specie = await species.findOne({_id: new app.mongo.ObjectId(id)});
        return specie;
    });

    app.delete('/species/:id',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        await species.deleteOne({_id: new app.mongo.ObjectId(id)});
        return reply.code(204).send();
    });
    

    app.put('/species/:id', {
        config:{
            requireAuthentication: true
        }
    }, async (request,reply) => {
        let id = request.params.id;
        let specie = request.body;

        await species.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set:{
                name:specie.name,
                habitat:specie.habitat,
                diet:specie.diet
            }
        });

        return reply.code(204).send();
    });

};
