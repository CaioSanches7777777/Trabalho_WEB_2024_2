/** @type{import('fastify').FastifyPluginAsync<>} */

import species from './species.js';

export default async function diets(app, options) {

    const diets = app.mongo.db.collection('diets');
    const species = app.mongo.db.collection('species');

    app.get('/diets', 
        {   
            //para exigir autenticação
            config: {
                logMe: true,
                //requireAuthentication: true
            }
        }, 
        async (request, reply) => {
            request.log.info(diets);
        return await diets.find().toArray();
    });

    app.post('/diets', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    type: { type: 'string' }
                },
                required: ['type']
            }
        },config:{
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let diet = request.body;
        let result = await diets.insertOne(diet);
        request.log.info(`Including diet ${diet.type}.`);
        return reply.code(201).send();
    });

    //ajeitar para buscar espécies com essa dieta
    app.get('/diets/:id/species', async (request, reply) => {
        let id = request.params.id;
        let diet = await diets.findOne({_id: new app.mongo.ObjectId(id)});
        let DietType = diet.type;
        let speciesDiet = await species.find({diet: DietType}).toArray();
        return speciesDiet; 
    });

    app.get('/diets/:id', async (request, reply) => {
        let id = request.params.id;
        let diet = await diets.findOne({_id: new app.mongo.ObjectId(id)});
        return diet;
    });

    app.delete('/diets/:id',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        await diets.deleteOne({_id: new app.mongo.ObjectId(id)});
        return reply.code(204).send();
    });
    

    app.put('/diets/:id', {
        config:{
            requireAuthentication: true
        }
    }, async (request,reply) => {
        let id = request.params.id;
        let diet = request.body;

        await diets.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set:{
                type:diet.type
            }
        });

        return reply.code(204).send();
    });

};
