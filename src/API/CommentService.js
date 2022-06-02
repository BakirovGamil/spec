const apiPath = 'http://localhost:3000/api/comment/';

export default class CommentService {

    //{specialistId, servvices, rating, data}
    static async addComment(dataObject) {
        const response = fetch(apiPath + `add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    static async getCommentsBySepcialistId(specialistId, limit) {
        const response = fetch(apiPath + `?specialistId=${specialistId}&limit=${limit}`);

        return response;
    }

    static async getCommentForUser(specialistId) {
        const response = fetch(apiPath + `getCommentForUser/?specialistId=${specialistId}`);

        return response;
    }

    static async getCommentStatsOfSpecialist(specialistId) {
        const response = fetch(apiPath + `getCommentStatsOfSpecialist?specialistId=${specialistId}`);

        return response;
    }

    //{specialistId, servvices, rating, data}
    static async updateComment(dataObject) {
        const response = fetch(apiPath + `update`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(dataObject)
        });

        return response;
    }

    static async deleteCommentBySpecialistId(specialistId) {
        const response = fetch(apiPath + `delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({specialistId})
        });

        return response;
    }
}