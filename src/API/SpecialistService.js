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

    static async getAllNotVerify(limit = 0, offset = 0) {
        const response = fetch(apiPath + `?limit=${limit}&offset=${offset}&isVerify=false`);

        return response;
    }

    static async getByUserId(userId) {
        const response = fetch(apiPath + `getByUserId/${userId}`);

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

    //{id, about}
    static async updateAboutById(dataObject) {
        const response = await fetch(apiPath + `update/about`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

      //{id, experience(array)}
      static async updateExperienceById(dataObject) {
        const response = await fetch(apiPath + `update/experience`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    //{id, professions(array)}
    static async updateProfessionsById(dataObject) {
        const response = await fetch(apiPath + `update/professions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

     //{id, isVerify} // role === "admin"
     static async updateIsVerifyById(dataObject) {
        const response = await fetch(apiPath + `update/isverify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
    });

        return response;
    }

    static async getCurrentSpecialist() {
        const response = fetch(apiPath + `get/currentspecialist`);

        return response;
    }

    static async getAllByName(name) {
        const response = fetch(apiPath + `getAll/ByName?name=${name}`);

        return response;
    }

    static async getAllByProfession(name) {
        const response = fetch(apiPath + `getAll/ByProfession?name=${name}`);

        return response;
    }
}