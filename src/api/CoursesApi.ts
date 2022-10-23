import axios from 'axios'
import { BASE_URL } from '../helpers/constants'
import { Course } from '../types/courses'

const instance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
})

export const CoursesApi = {
	getCourses() {
		return instance.get<{ courses: Course[] }>('/courses')
	},
}
