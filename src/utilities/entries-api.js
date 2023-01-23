import sendRequest from './send-request'

const BASE_URL= '/api/entries'

export function getAll(){//not used yet
    return sendRequest(BASE_URL)
}

export function getIncomeEntries(dash_id) { //get specific entries for income
    return sendRequest(`${BASE_URL}/${dash_id}/income`);
}

export function createEntry(entryData){ //not used yet
    return sendRequest(`${BASE_URL}`, 'POST', entryData)
}