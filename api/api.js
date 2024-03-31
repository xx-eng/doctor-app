import request from '@/utils/request'

/**
 * 发送post请求
 * @param url
 * @param data
 * @returns {AxiosPromise}
 */

export function post(url, data) {
    console.log('url', data)
    return request({
        url: url,
        method: 'post',
        data
    })
}

export function get(url, data) {
    return request({
        url: url,
        method: 'get',
        data
    })
}

/**
 * get方法获取文件内容
 * @param url
 * @returns {AxiosPromise}
 */
export function getFile(url) {
    return request({
        url: url,
        method: 'get',
        responseType: 'arraybuffer'
    })
}

/**
 * 请求数据列表的函数
 * @param baseUrl 基础URL
 * @param data  请求参数
 * @returns {AxiosPromise}
 */
export function baseList(baseUrl, data) {
    return post(baseUrl + '/list', data)
}

/**
 * 判断数据是否存在的请求函数
 * @param baseUrl 基础URL
 * @param data  请求参数
 * @returns {AxiosPromise}
 */
export function baseJudge(baseUrl, data) {
    return post(baseUrl + '/judge', data)
}

/**
 * 新增/更新数据时函数请求
 * @param baseUrl 基础URL
 * @param data  请求参数
 * @returns {AxiosPromise}
 */
export function baseEdit(baseUrl, data) {
    const { id } = data
    const url = baseUrl + (id === 0 ? '/add' : '/update')
    return post(url, data)
}

/**
 * 删除数据时函数请求
 * @param baseUrl 基础URL
 * @param ids id集合，多个之间以','分隔
 * @returns {AxiosPromise}
 */
export function baseDel(baseUrl, ids) {
    const data = { ids: ids }
    return post(baseUrl + '/delete', data)
}
