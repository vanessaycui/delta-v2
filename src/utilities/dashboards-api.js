import sendRequest from './send-request'

const BASE_URL= '/api/dashboards'

export function getAll(){
    return sendRequest(BASE_URL)
}

export function getDashboard(dashId) { //get function
    return sendRequest(`${BASE_URL}/${dashId}`);
}

export function createDashboard(dashboardData){
    return sendRequest(`${BASE_URL}`, 'POST', dashboardData)
}

export function deleteDashboard(dashId){
    return sendRequest(`${BASE_URL}/${dashId}`, 'DELETE')
}