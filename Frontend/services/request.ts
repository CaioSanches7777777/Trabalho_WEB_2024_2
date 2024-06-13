
export function request<TResponse>(
    url: string,
    config: RequestInit = {}
):Promise<TResponse> {
    return fetch(url, config) 
        .then((response) => response.json())
        .then((response) => response as TResponse);
}