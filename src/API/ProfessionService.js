const apiPath = 'http://localhost:3000/api/profession/';

export default class FavoriteService {

    //{specialistId, servvices, rating, data}
    static async getAllByName(name) {
        const response = fetch(apiPath + `getAllByName?name=${name}`);

        return response;
    }

    //{name}
    static async add(name) {
        const response = fetch(apiPath + `add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name})
        });

        return response;
    }
}