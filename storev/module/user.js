import storage from '@/storev'
import { getInfo, login, logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/storev/mutation-types'
import { welcome } from '@/utils/util'
// import md5 from 'md5'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        userId: '',
        hasGetInfo: false,
        info: {}
    },

    mutations: {
        SET_ID: (state, userId) => {
            state.userId = userId
        },
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_HAS_GET_INFO: (state, hasGetInfo) => {
            state.hasGetInfo = hasGetInfo
        },
        RESET_INFO: (state) => {
            state.token = ''
            state.name = ''
            state.info = {}
            state.hasGetInfo = false
            state.welcome = ''
            state.avatar = ''
            storage.remove(ACCESS_TOKEN)
        }
    },

    actions: {
        // 登录
        Login ({ commit }, userInfo) {
            console.log('进入这里')
            const { account, password } = userInfo
            return new Promise((resolve, reject) => {
                // const pass = md5(password)
                console.log('module login')
                const pass = password
                login({
                    mobile: account,
                    password: pass
                }).then(response => {
                    const { data } = response
                    console.log('data', data)
                    // let time = 2 * 60 * 60 * 1000
                    // if (keepLogin) {
                    //     time = 7 * 24 * 60 * 60 * 1000
                    // }
                    // storage.set(ACCESS_TOKEN, data['id'], time)
                    commit('SET_TOKEN', data['id'])
                    commit('SET_ID', data['id'])
                    console.log("headers", response.headers)
                    console.log('user.state.userId', user.state.userId)
                    console.log("user.state.token", user.state.token)
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo ({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const { data } = response
                    commit('SET_HAS_GET_INFO', true)
                    commit('SET_NAME', { name: data.username, welcome: welcome() })
                    commit('SET_INFO', data)
                    // commit('SET_AVATAR', data.avatar)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout ({ commit }) {
            return new Promise((resolve) => {
                logout().then(() => {
                    commit('RESET_INFO')
                    resolve()
                }).catch(() => {
                    commit('RESET_INFO')
                    resolve()
                })
            })
        },

        // 信息失效
        ResetToken ({ commit }) {
            return new Promise(resolve => {
                commit('RESET_INFO')
                resolve()
            })
        }
    }
}

export default user

/*import storage from 'store'
import { getInfo, login, logout } from '@/api/user'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import md5 from 'md5'

const user = {
    state: {
        token: '',
        name: '',
        welcome: '',
        avatar: '',
        hasGetInfo: false,
        info: {}
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, { name, welcome }) => {
            state.name = name
            state.welcome = welcome
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_INFO: (state, info) => {
            state.info = info
        },
        SET_HAS_GET_INFO: (state, hasGetInfo) => {
            state.hasGetInfo = hasGetInfo
        },
        RESET_INFO: (state) => {
            state.token = ''
            state.name = ''
            state.info = {}
            state.hasGetInfo = false
            state.welcome = ''
            state.avatar = ''
            storage.remove(ACCESS_TOKEN)
        }
    },

    actions: {
        // 登录
        Login ({ commit }, userInfo) {
            const { account, password, keepLogin } = userInfo
            return new Promise((resolve, reject) => {
                const pass = md5(password)
                login({
                    account: account,
                    password: pass,
                    keepLogin: keepLogin
                }).then(response => {
                    const { data } = response
                    console.log('data', data)
                    let time = 2 * 60 * 60 * 1000
                    if (keepLogin) {
                        time = 7 * 24 * 60 * 60 * 1000
                    }
                    storage.set(ACCESS_TOKEN, data['accessToken'], time)
                    commit('SET_TOKEN', data['accessToken'])
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 获取用户信息
        GetInfo ({ commit }) {
            return new Promise((resolve, reject) => {
                getInfo().then(response => {
                    const { data } = response
                    commit('SET_HAS_GET_INFO', true)
                    commit('SET_NAME', { name: data.username, welcome: welcome() })
                    commit('SET_INFO', data)
                    // commit('SET_AVATAR', data.avatar)
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 登出
        Logout ({ commit }) {
            return new Promise((resolve) => {
                logout().then(() => {
                    commit('RESET_INFO')
                    resolve()
                }).catch(() => {
                    commit('RESET_INFO')
                    resolve()
                })
            })
        },

        // 信息失效
        ResetToken ({ commit }) {
            return new Promise(resolve => {
                commit('RESET_INFO')
                resolve()
            })
        }
    }
}

export default user*/
