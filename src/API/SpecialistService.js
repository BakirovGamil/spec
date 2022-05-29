const apiPath = 'http://localhost:3000/api/specialist/';

export default class SpecialistService {
    static async getById(specialistId) {
        const response = fetch(apiPath + `${specialistId}`);

        return response;
    }

    static async getAll(limit = 10, offset = 0) {
        const response = fetch(apiPath + `?limit=${limit}&offset=${offset}`);

        return response;
    }

    //{about, experience (array)}
    static async registration(dataObject) {
        const response = await fetch(apiPath + `registration`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }
}