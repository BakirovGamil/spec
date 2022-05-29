const apiPath = 'http://localhost:3000/api/comment/';

export default class CommentService {
    static async getCommentsBySepcialistId(specialistId, limit) {
        const response = fetch(apiPath + `?specialistId=${specialistId}&limit=${limit}`);

        return response;
    }
}