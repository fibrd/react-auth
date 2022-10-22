import axios from 'axios'
import { LoginRequestBody, RegisterRequestBody } from '../types/common'
import { Course } from '../types/courses'
import { User } from '../types/users'

const URL_ENDPOINT = 'http://localhost:3001/api'

export const LoraApi = {
	getCourses() {
		return axios.get<{ courses: Course[] }>(URL_ENDPOINT + '/courses')
	},

	register(body: RegisterRequestBody) {
		return axios.post<{ message: string }>(URL_ENDPOINT + '/register', body)
	},

	login(body: LoginRequestBody) {
		return axios.post<{ message: string, user:User }>(URL_ENDPOINT + '/login', body)
	},
}
