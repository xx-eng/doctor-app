import { post } from '@/api/api.js'

const baseUrl = '/user'

export function getAppointments() {
    return post('/user/getAppointment' )
}

export function appoint(data){
    return post(baseUrl + '/appointmentDoctor', data)
}

export function cancel(data){
    return post(baseUrl + '/cancelAppointment', data)
}