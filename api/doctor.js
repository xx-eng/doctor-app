import { get } from '@/api/api.js'
// post,

const baseUrl = '/user'

/**
 * 查看所有医生
 * @param data
 * @returns {AxiosPromise}
 */
export function listDoctor () {
    return get(baseUrl + '/getDoctorList')
}

export function getDoctorInfo(data) {
    return get(baseUrl + '/showDoctor/' + data)
}

export function getSchedule(){
    return get(baseUrl + '/getSchedule')
}
