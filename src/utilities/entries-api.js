import sendRequest from './send-request'

const BASE_URL= '/api'

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

export function getFilteredEntries(dashId, queryInfo){
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/entries/filtered`, 'POST', queryInfo)
}

export function deleteEntry(dashId, entryId){
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/entries/${entryId}`, 'DELETE')
}