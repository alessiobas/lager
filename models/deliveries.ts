import config from "../config/config.json";
import Delivery from "../interfaces/delivery";

const receipts = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    addADelivery: async function addADelivery(delivery: Partial<Delivery>) {

        let addedDeliveries = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            comment: delivery.comment,
            api_key: config.api_key,
        };

        await fetch(`${config.base_url}/deliveries`, {
            body: JSON.stringify(addedDeliveries),
            headers: {
                'content-type':'application/json'
            },
            method: 'POST'
        });
    },
};

export default receipts;