/** @type{import('fastify').FastifyPluginAsync<>} */

import species from './species.js';

export default async function habitats(app, options) {

    const habitats = app.mongo.db.collection('habitats');
    const species = app.mongo.db.collection('species');

    app.get('/habitats', 
        {   
            //para exigir autenticação
            config: {
                logMe: true,
                //requireAuthentication: true
            }
        }, 
        async (request, reply) => {
            request.log.info(habitats);
        return await habitats.find().toArray();
    });

    app.post('/habitats', {
        schema: {
            body: {
                type: 'object',
                properties: {
                    id: { type: 'integer' },
                    name: { type: 'string' },
                    temperature: { type: 'string' }
                },
                required: ['name', 'temperature']
            }
        },config:{
            requireAuthentication: true,
            checkAdmin: true
        }
    }, async (request, reply) => {
        let habitat = request.body;
        let result = await habitats.insertOne(habitat);
        request.log.info(`Including habitat ${habitat.name}.`);
        return reply.code(201).send();
    });

    //ajeitar para buscar especies desse tipo de habitat
    app.get('/habitats/:id/species', async (request, reply) => {
        let id = request.params.id;
        let habitat = await habitats.findOne({_id: new app.mongo.ObjectId(id)});
        let HabitatName = habitat.name;
        let speciesHabitat = await species.find({habitat: HabitatName}).toArray();
        return speciesHabitat; 
    });

    app.get('/habitats/:id', async (request, reply) => {
        let id = request.params.id;
        let habitat = await habitats.findOne({_id: new app.mongo.ObjectId(id)});
        return habitat;
    });

    app.delete('/habitats/:id',{
        config:{
            requireAuthentication: true
        }}, async (request, reply) => {
        let id = request.params.id;
        await habitats.deleteOne({_id: new app.mongo.ObjectId(id)});
        return reply.code(204).send();
    });
    

    app.put('/habitats/:id', {
        config:{
            requireAuthentication: true
        }
    }, async (request,reply) => {
        let id = request.params.id;
        let habitat = request.body;

        await habitats.updateOne({_id: new app.mongo.ObjectId(id)}, {
            $set:{
                name:habitat.name
            }
        });

        return reply.code(204).send();
    });

};
