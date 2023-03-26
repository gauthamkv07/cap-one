
class CaptialOneAPIService {
    constructor() {
        console.log('api key is', process.env.REACT_APP_CAPITALONE_API_API_KEY);
        this.request = require('superagent');
    }

    getURL(endpoint) {
        return `${process.env.REACT_APP_CAPITALONE_API_API_URL}${endpoint}?key=${process.env.REACT_APP_CAPITALONE_API_API_KEY}`;
    }

    async getAllCustomerIds(endpoint) {
        try {
            const response = await this.request.get(this.getURL(endpoint))
                .then((res) => {
                    return res;
                });
            return response;
        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    async getLastFourMonthData(endpoint) {
        try {
            var date1 = new Date();
            date1.setMonth(date1.getMonth() - 1);

            var date2 = new Date();
            date2.setMonth(date2.getMonth() - 2);

            var date3 = new Date();
            date3.setMonth(date3.getMonth() - 3);

            var date4 = new Date();
            date4.setMonth(date4.getMonth() - 4);

            var today = new Date();
            var month = today.toLocaleString('default', { month: 'long' });
            var month1 = date1.toLocaleString('default', { month: 'long' });
            var month2 = date2.toLocaleString('default', { month: 'long' });
            var month3 = date3.toLocaleString('default', { month: 'long' });
            var month4 = date4.toLocaleString('default', { month: 'long' });

            const output = [
                {
                    month: month,
                    credit: 4000,
                    debit: 2400
                },
                {
                    month: month1,
                    credit: 2500,
                    debit: 1500
                },
                {
                    month: month2,
                    credit: 3000,
                    debit: 500
                },
                {
                    month: month3,
                    credit: 3800,
                    debit: 123
                },
                {
                    month: month4,
                    credit: 3800,
                    debit: 123
                }]

            const response = await this.request.get(this.getURL(endpoint))
                .then((res) => {
                    return res;
                });
            let json = JSON.parse(response.text);
            console.log(json)
            return output;
        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }
}

export default CaptialOneAPIService;