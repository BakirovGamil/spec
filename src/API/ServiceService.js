const apiPath = 'http://localhost:3000/api/service/';

export default class ServiceService {
    static async getBySpecialistId(specialistId) {
        const response = fetch(apiPath + `${specialistId}`);

        return response;
    }
}