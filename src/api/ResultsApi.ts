import axios from 'axios'
import { Result } from '../types/results'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const ResultsApi = {
	getResults() {
		return instance.get<{ results: Result[] }>('/results')
	},
}
