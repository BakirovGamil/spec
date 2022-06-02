const apiPath = 'http://localhost:3000/api/image/';

export default class ImageService {
    static async getGalleryByUsertId(userId, limit) {
        const response = fetch(apiPath + `?userId=${userId}&limit=${limit}&type=gallery`);

        return response;
    }

    static async getAvatarByUsertId(userId) {
        const response = fetch(apiPath + `?userId=${userId}&type=avatar`);

        return response;
    }

    // type = avatar, gallery, passport
    static async uploadImage(blobFile, type) {
        const formdata = new FormData();
	    formdata.append('image', blobFile, 'image.png');
        formdata.append('type', type);

        const response = await fetch(apiPath + `uploadImage`, {
            method: 'POST',
            body: formdata
        });

        return response;
    }
}