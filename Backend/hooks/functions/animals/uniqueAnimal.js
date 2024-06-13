import { ALREADY_EXISTS, AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../../libs/errors.js"; 

export const uniqueAnimal = (app) => async (request, reply) => {
    const animals = app.mongo.db.collection('species');

    let animal = request.body;

    let result = await animals.count({name: animal.name});

    if(result>0){
        throw new ALREADY_EXISTS 
    }
}