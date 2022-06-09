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
    static async uploadImage(blobFile, type = 'gallery', description = '') {
        const formdata = new FormData();
	    formdata.append('image', blobFile, 'image.png');
        formdata.append('type', type);
        formdata.append('description', description);

        const response = await fetch(apiPath + `uploadImage`, {
            method: 'POST',
            body: formdata
        });

        return response;
    }

    static async deleteById(id) {
        const response = fetch(apiPath + `delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });

        return response;
    }

    static async updateDescriptionById(description, id) {
        const response = fetch(apiPath + `updateDescription`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id, description})
        });

        return response;
    }
}