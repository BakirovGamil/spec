const apiPath = 'http://localhost:3000/api/favorite/';

export default class FavoriteService {

    //{specialistId, servvices, rating, data}
    static async getByUserId(userId) {
        const response = fetch(apiPath + `${userId}`);

        return response;
    }

    //{specialistId}
    static async addBySpecialistId(specialistId) {
        const response = fetch(apiPath + `add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({specialistId})
        });

        return response;
    }

    static async deleteById(id) {
        const response = fetch(apiPath + `delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });

        return response;
    }
}