import axios from 'axios'
import { Course } from '../types/courses'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const CoursesApi = {
	getCourses() {
		return instance.get<{ courses: Course[] }>('/courses')
	},
}
