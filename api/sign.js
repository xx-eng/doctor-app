import {get, post} from '@/api/api.js'

const baseUrl = '/user'

export function getSignInfo(data) {
    return get(baseUrl + '/showSign/' + data)
}

export function cancelDoctor(data) {
    return post(baseUrl + '/rescindDoctor', data)
}

export function signDoctor(data) {
    return get(baseUrl + '/signDoctor/'+ data)
}