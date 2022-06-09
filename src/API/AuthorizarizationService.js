const apiPath = 'http://localhost:3000/api/';

export default class AuthorizationService {
    static async getCurrentUser() {
        const response = fetch(apiPath + `getCurrentUser`);

        return response;
    }

    // {login, password}
    static async login(dataObject) { 
        const response = await fetch(apiPath + `login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    // {lastName, firstName, middleName, login, password, phoneNumber}
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

    //{id, lastName, firstName, middleName}
    static async updateUserById(dataObject) { 
        const response = fetch(apiPath + `updateuser`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    //{id, isBanned} // role === "admin"
    static async updateIsBanned(dataObject) { 
        const response = fetch(apiPath + `updateIsBanned`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    static async logout() { 
        const response = fetch(apiPath + `logout`);

        return response;
    }
}