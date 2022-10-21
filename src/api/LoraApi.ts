import { Course } from '../types/courses'
import { get } from '../utils/axios'

export const LoraApi = {
	getCourses() {
		return get<{ courses: Course[] }>('http://localhost:3001/api/courses')
	},
}
