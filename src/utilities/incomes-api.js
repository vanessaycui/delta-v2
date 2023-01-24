import sendRequest from './send-request'

const BASE_URL= '/api'

export function createIncome(dash_id, newIncome) { //get function
    return sendRequest(`${BASE_URL}/dashboards/${dash_id}/incomes`,'POST', newIncome);
}
