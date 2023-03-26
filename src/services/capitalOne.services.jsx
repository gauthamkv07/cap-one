
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

    monthDiff(dateFrom, dateTo) {
        return dateTo.getMonth() - dateFrom.getMonth() +
            (12 * (dateTo.getFullYear() - dateFrom.getFullYear()))
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

            var indexMap = {};
            indexMap[month] = 0;
            indexMap[month1] = 1;
            indexMap[month2] = 2;
            indexMap[month3] = 3;
            indexMap[month4] = 4;

            const output = [
                {
                    month: month,
                    credit: 0,
                    debit: 0
                },
                {
                    month: month1,
                    credit: 0,
                    debit: 0
                },
                {
                    month: month2,
                    credit: 0,
                    debit: 0
                },
                {
                    month: month3,
                    credit: 0,
                    debit: 0
                },
                {
                    month: month4,
                    credit: 0,
                    debit: 0
                }]

            const response = await this.request.get(this.getURL(endpoint))
                .then((res) => {
                    return res;
                });
            let json = JSON.parse(response.text);
            console.log(json[0]["purchase_date"])
            json.forEach(transaction => {
                const [year, month, day] = transaction["purchase_date"].split("-");
                let transDate = new Date(year, month - 1, day);
                let transMonth = transDate.toLocaleString('default', { month: 'long' });
                if (this.monthDiff(transDate, today) < 4) {
                    output[indexMap[transMonth]]["debit"] += transaction["amount"]
                }
            })
            return output;
        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    async getSpendingsByCategory(endpoint) {
        try {
            const response = await this.request.get(this.getURL(endpoint))
                .then((res) => {
                    return res;
                });
            let json = JSON.parse(response.text);
            var startDate = new Date("2023-01-01");
            var endDate = new Date();

            let result = json.filter((data) => {
                return +new Date(data.purchase_date) >= startDate && +new Date(data.purchase_date) <= endDate;
              })
            console.log(result)

            return [
                { category: "Food", totalSpendings: 400 },
                { category: "Groceries", totalSpendings: 300 }
            ];

        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }
}

export default CaptialOneAPIService;