const apiPath = 'http://localhost:3000/api/service/';

export default class ServiceService {
    static async getBySpecialistId(specialistId) {
        const response = fetch(apiPath + `${specialistId}`);

        return response;
    }

    //{name, price}
    static async add(dataObject) {
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