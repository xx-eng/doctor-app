import { baseDel, baseJudge, post, get} from '@/api/api.js'
import { baseEdit, baseList } from '@/api/api'

const baseUrl = '/user'

/**
 * 用户登录
 * @param data
 * @returns {AxiosPromise}
 */
export function login (data) {
    return post(baseUrl + '/login', data)
}

export function getUserInfo(data){
    return get(baseUrl+ '/get', data)
}

export function updateUserInfo(data){
    return post(baseUrl + '/update', data)
}

/**
* 获取用户信息
* @returns {AxiosPromise}
*/
export function getInfo () {
    return post(baseUrl + '/getInfo')
}

/**
 * 用户登出
 * @returns {AxiosPromise}
 */
export function logout () {
    return post(baseUrl + '/logout')
}

