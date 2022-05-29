const apiPath = 'http://localhost:3000/api/image/';

export default class ImageService {
    static async getGalleryByUsertId(userId) {
        const response = fetch(apiPath + `?userId=${userId}&type=gallery`);

        return response;
    }

    static async getAvatarByUsertId(userId) {
        const response = fetch(apiPath + `?userId=${userId}&type=avatar`);

        return response;
    }
}