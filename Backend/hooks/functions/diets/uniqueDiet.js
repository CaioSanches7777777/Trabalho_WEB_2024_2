import { ALREADY_EXISTS, AUTH_INVALID_TOKEN, AUTH_NO_TOKEN } from "../../../libs/errors.js"; 
import diets from "../../../routes/diets.js";

export const uniqueDiet = (app) => async (request, reply) => {
    const diets = app.mongo.db.collection('diets');

    let diet = request.body;

    let result = await diets.count({type: diet.type});

    if(result>0){
        throw new ALREADY_EXISTS 
    }
}