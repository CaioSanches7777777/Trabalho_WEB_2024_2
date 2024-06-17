
export function request<TResponse>(
    url: string,
    config: RequestInit = {}
):Promise<TResponse> {
    return fetch(url, config) 
        .then((response) => {try{response.json()}catch(e){}})
        .then((response) => response as TResponse);
}

/*
export function request<TResponse>(
    url: string,
    config: RequestInit = {}
):Promise<TResponse> {
    return fetch(url, config) 
        .then((response) => {try{response.json()}catch(e){}})
        .then((response) => {try{response as TResponse}catch(e){return TResponse}});
}*/