import sendRequest from './send-request'

const BASE_URL= '/api'

export function createCategory(dashId, newCategory) { //get function
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/categories`,'POST', newCategory);
}

export function deleteCategory(dashId, catId){
    return sendRequest(`${BASE_URL}/dashboards/${dashId}/categories/${catId}`,'DELETE');

}