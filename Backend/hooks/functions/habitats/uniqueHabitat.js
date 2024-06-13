import { ALREADY_EXISTS, AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../../libs/errors.js"; 

export const uniqueHabitat = (app) => async (request, reply) => {
    const habitats = app.mongo.db.collection('habitats');

    let habitat = request.body;

    let result = await habitats.count({name: habitat.name});

    if(result>0){
        throw new ALREADY_EXISTS 
    }
}