import axios from 'axios'
import { RegisterRequestBody } from '../types/common'
import { Course } from '../types/courses'

const URL_ENDPOINT = 'http://localhost:3001/api'

export const LoraApi = {
	getCourses() {
		return axios.get<{ courses: Course[] }>(URL_ENDPOINT + '/courses')
	},

	register(body: RegisterRequestBody) {
		return axios.post<{ message: string }>(URL_ENDPOINT + '/register', body)
	},
}
