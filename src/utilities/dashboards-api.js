import sendRequest from './send-request'

const BASE_URL= '/api/dashboards'

export function getAll(){
    return sendRequest(BASE_URL)
}

// export function getByAdminId(admin_id) { //get function
//     return sendRequest(`${BASE_URL}/${admin_id}`);
// }

export function getDashboard(dash_id) { //get function
    return sendRequest(`${BASE_URL}/${dash_id}`);
}

export function createDashboard(dashboardData){
    return sendRequest(`${BASE_URL}`, 'POST', dashboardData)
}