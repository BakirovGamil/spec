const apiPath = 'http://localhost:3000/api/subscription/';

export default class SubscriptionService {
    static async getNotArchived() {
        const response = fetch(apiPath + `getNotArchived`);

        return response;
    }

    static async buySubsById(id) {
        const response = fetch(apiPath + `buy`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });

        return response;
    }

    static async addOrder(subsUserId, comment) {
        const response = fetch(apiPath + `addOrder`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({subsUserId, comment})
        });

        return response;
    }

    static async acceptOrderById(id) {
        const response = fetch(apiPath + `acceptOrderById`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });

        return response;
    }

    static async updateHistoryOrderStatusById(id) {
        const response = fetch(apiPath + `updateActiveOrderSpecialistByOrderId`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });

        return response;
    }

    static async getActiveOrdersBySpecialist() {
        const response = fetch(apiPath + `getActiteOrderBySpecialist`);

        return response;
    }

    static async getCurrentSubs() {
        const response = fetch(apiPath + `getcurrentsubs`);

        return response;
    }

    static async getCurrentExperiedSubs() {
        const response = fetch(apiPath + `getcurrentexperiedsubs`);

        return response;
    }

    static async getCurrentActiveOrders() {
        const response = fetch(apiPath + `getcurrentactiveorders`);

        return response;
    }

    static async getOrdersForSpecialist() {
        const response = fetch(apiPath + `getordersforspecialist`);

        return response;
    }

    static async deleteactiveorderbyid(id) {
        const response = fetch(apiPath + `deleteactiveorderbyid`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        });
        return response;
    }

    static async getArchived() {
        const response = fetch(apiPath + `getArchived`);

        return response;
    }

    static async getAll() {
        const response = fetch(apiPath + `getAll`);

        return response;
    }

    static async getSpecialistsBySubscriptionId(id) {
        const response = fetch(apiPath + `getSpecialistsBySubscriptionId?id=${id}`);

        return response;
    }

    //{title, description, imgUrl, price, months, backgroundColor, color, limit}
    static async addSubscription({title, description, imgUrl, price, months, backgroundColor, color, limit}) {
        const response = fetch(apiPath + `add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({title, description, imgUrl, price, months, backgroundColor, color, limit})
        });

        return response;
    }

    static async updateisinarchive(id, isInArchive) {
        const response = fetch(apiPath + `updateisinarchive`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id, isInArchive})
        });

        return response;
    }

    static async addSpecialisToSubs(specialistId, subscriptionId) {
        const response = fetch(apiPath + `addspecialisttosubs`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({specialistId, subscriptionId})
        });

        return response;
    }

    static async deleteSpecialistFromSubscription(specialistId, subscriptionId) {
        const response = fetch(apiPath + `deletespecialistsbysubscriptionid`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({specialistId, subscriptionId})
        });

        return response;
    }

    static async edit(id, {title, description, imgUrl, price, months, backgroundColor, color, limit}) {
        const response = fetch(apiPath + `edit`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id,
                subscription:  {title, description, imgUrl, price, months, backgroundColor, color, limit}
            })
        });

        return response;
    }
}