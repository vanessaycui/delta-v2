import sendRequest from './send-request'

const BASE_URL= '/api'

export function createCategory(dash_id, newCategory) { //get function
    return sendRequest(`${BASE_URL}/dashboards/${dash_id}/categories`,'POST', newCategory);
}
