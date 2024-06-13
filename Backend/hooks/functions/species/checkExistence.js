import { ALREADY_EXISTS, AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../../libs/errors.js"; 

export const checkExistence = (app) => async (request, reply) => {
    const species = app.mongo.db.collection('species');

    let specie = request.body;

    let result = await species.count({name: specie.name});

    if(result>0){
        throw new ALREADY_EXISTS 
    }
}