import sendRequest from './send-request'

const BASE_URL= '/api'

// export function getAll(){//not used yet
//     return sendRequest(BASE_URL)
// }

// export function getIncomeEntries(dash_id) { //get specific entries for income
//     return sendRequest(`${BASE_URL}/${dash_id}/income`);
// }

export function createEntry(dashId, entryData){ //not used yet
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/entries`, 'POST', entryData)
}

export function getRowCategory(dashId, queryInfo){ //keep as post since more than 1 word for category type
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/entries/categories`, 'POST', queryInfo)
}

export function getRowIncome(dashId, queryInfo){//keep as post since more than 1 work for income type
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/entries/incomes`, 'POST', queryInfo)
}

export function getSummary(dashId){
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/entries/summary`,'GET')
}