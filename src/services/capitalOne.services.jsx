
class CaptialOneAPIService {
    constructor() {
        this.request = require('superagent');
        this.mongoRequest = require('superagent');
    }

    getURL(endpoint) {
        return `${process.env.REACT_APP_CAPITALONE_API_API_URL}${endpoint}?key=${process.env.REACT_APP_CAPITALONE_API_API_KEY}`;
    }

    getMongoURL(endpoint) {
        return `${process.env.REACT_APP_CAPITALONE_BACKEND_URL}${endpoint}`;
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

    getMonthName(monthNumber) {
        monthNumber = monthNumber < 0 ? (12 + monthNumber) : monthNumber;
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthNumber];
    }

    async getLastFourMonthData(endpoint) {
        try {
            var today = new Date();
            var month = this.getMonthName(today.getMonth());
            var month1 = this.getMonthName(today.getMonth() - 1);
            var month2 = this.getMonthName(today.getMonth() - 2);
            var month3 = this.getMonthName(today.getMonth() - 3);
            var month4 = this.getMonthName(today.getMonth() - 4);

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
            json.forEach(transaction => {
                const [year, month, day] = transaction["purchase_date"].split("-");
                let transDate = new Date(year, month - 1, day);
                let transMonth = transDate.toLocaleString('default', { month: 'long' });
                if (this.monthDiff(transDate, today) < 5) {
                    output[indexMap[transMonth]]["debit"] += transaction["amount"]
                }
            })
            return output;
        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    async checkCategoryPredictorActive(endpoint, description) {
        const data = {};
        data["description"] = description;
        const url = `${process.env.REACT_APP_CATEGORY_PREDICTOR_URL}${endpoint}`;
        const resp = this.request.post(url)
            .send(data)
            .set('Content-Type', 'application/json')
            .then((res) => {
                return res; // return the response object
            })
            .catch((err) => {
                console.error('the err is', err);
            });
        return resp;
    }

    async populateMerchantAmountMap(endpoint) {
        try {
            const response = await this.request.get(this.getURL(endpoint))
                .then((res) => {
                    return res;
                });
            let json = JSON.parse(response.text);
            var startDate = new Date("2023-01-01");
            var endDate = new Date();

            let tempResult = json.filter((data) => {
                return +new Date(data.purchase_date) >= startDate && +new Date(data.purchase_date) <= endDate;
            })

            // const mongoData = await this.getMongoData("https://cap-one-backend.herokuapp.com/api/merchants");
            // console.log(mongoData)
            let merchantAmountMap = {};
            let promises = tempResult.map(async (trans) => {
                let predictorResponse = await this.checkCategoryPredictorActive("/predict", trans["description"]);
                let merCat = (predictorResponse.status === 200) ? predictorResponse.body.category : "others";
                return { category: merCat, amount: trans["amount"] };
            });

            await Promise.all(promises).then((result) => {
                result.forEach((item) => {
                    merchantAmountMap[item.category] = ((!merchantAmountMap[item.category]) ? 0 : merchantAmountMap[item.category]) + item.amount;
                });
            });

            return merchantAmountMap;

        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    async getSpendingsByCategory(endpoint) {
        const merchantAmountMap = await this.populateMerchantAmountMap(endpoint);
        const output = [];
        for (var key in merchantAmountMap) {
            output.push({
                "category": key.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()),
                "totalSpendings": merchantAmountMap[key]
            })
        }
        return output;
    }


    getMerchantCategory(mongoData, merId) {
        const filteredData = mongoData.filter(item => item["merchant-id"] === merId);
        return filteredData[0]["merchant-category"];
    }

    async getMongoData(endpoint) {
        try {

            const mongoResponse = await this.mongoRequest.get(endpoint)
                .then((res) => {
                    return res;
                });
            let json = JSON.parse(mongoResponse.text);
            return json


        } catch (error) {
            console.error(`Error while making GET request to ${endpoint}:`, error);
            throw error;
        }
    }

    async getAllTrans() {
        const response = await this.request.get(this.getURL('/accounts/641f5f1978f6910a15f0e098/purchases'))
            .then((res) => {
                return res;
            });
        let json = JSON.parse(response.text);
        return json;
    }

    async getTotalOutFlow() {
        const trans = await this.getAllTrans();
        let op = 0;
        let today = new Date();
        trans.forEach(tran => {
            const [year, month, day] = tran["purchase_date"].split("-");
            let transDate = new Date(year, month - 1, day);
            if (today.getFullYear() === transDate.getFullYear()) {
                op += tran["amount"]
            }
        })
        return op;
    }

    getMerchantName(mongoData, merId) {
        const filteredData = mongoData.filter(item => item["merchant-id"] === merId);
        return filteredData[0]["merchant-name"];
    }

    async getRecentTransactions() {
        const trans = await this.getAllTrans();
        const mongoData = await this.getMongoData("https://cap-one-backend.herokuapp.com/api/merchants");
        const op = [];
        trans.sort((tran1, tran2) => {
            return new Date(tran2["purchase_date"]) - new Date(tran1["purchase_date"])
        })
        let iter = (trans.length < 5) ? trans.length : 10;
        for (let i = 0; i < iter; i++) {
            const [year, month, day] = trans[i]["purchase_date"].split("-");
            let transDate = new Date(year, month - 1, day);
            let transMonth = transDate.toLocaleString('default', { month: 'long' });
            let d = {}
            d["month"] = transMonth;
            d["day"] = day;
            d["receiver"] = this.getMerchantName(mongoData, trans[i]["merchant_id"]);
            d["price"] = trans[i]["amount"];
            op.push(d)
        }
        return op;
    }

    async getThisMonthAmt() {
        const trans = await this.getAllTrans();
        let op = 0;
        let today = new Date();
        trans.forEach(tran => {
            const [year, month, day] = tran["purchase_date"].split("-");
            let transDate = new Date(year, month - 1, day);
            if (today.getMonth() === transDate.getMonth()) {
                op += tran["amount"]
            }
        })
        return op;
    }
}

export default CaptialOneAPIService;