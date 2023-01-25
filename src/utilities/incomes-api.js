import sendRequest from './send-request'

const BASE_URL= '/api'

export function createIncome(dash_id, newIncome) { //get function
    return sendRequest(`${BASE_URL}/dashboards/${dash_id}/incomes`,'POST', newIncome);
}

export function deleteIncome(dashId, incomeId){
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/incomes/${incomeId}`,'DELETE');

}

export function updateIncome(dashId, incomeId, incomeData){
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/incomes/${incomeId}`,'PUT', incomeData);
}