const apiPath = 'http://localhost:3000/api/service/';

export default class ServiceService {
    static async getBySpecialistId(specialistId) {
        const response = fetch(apiPath + `${specialistId}`);

        return response;
    }

    //{name, price, unit}
    static async add(dataObject) {
        const response = await fetch(apiPath + `add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    //{id, name, price, unit}
    static async updateById(dataObject) {
        const response = await fetch(apiPath + `update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    //{id}
    static async deleteById(id) {
        const response = await fetch(apiPath + `delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });

        return response;
    }
}