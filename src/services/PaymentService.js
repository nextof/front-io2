// services/PaymentService.js

import axios from 'axios';

export default {
    async createCheckoutSession({ reservationId, amount, carName }) {
        return axios.post('/api/payment/create-checkout-session', {
            reservationId,
            amount,
            carName
        });
    }
};