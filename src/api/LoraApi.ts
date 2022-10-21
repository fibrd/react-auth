import { RegisterRequestBody } from '../types/common'
import { Course } from '../types/courses'
import { get, post } from '../utils/axios'

const URL_ENDPOINT = 'http://localhost:3001/api'

export const LoraApi = {
	getCourses() {
		return get<{ courses: Course[] }>(URL_ENDPOINT + '/courses')
	},

	register(body: RegisterRequestBody) {
		return post<typeof body>(URL_ENDPOINT + '/register', body)
	},
}
