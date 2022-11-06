import axios from 'axios'
import { Result, UpsertResultBody } from '../types/results'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const ResultsApi = {
	getResults() {
		return instance.get<{ results: Result[] }>('/results')
	},
	upsertResult(body: UpsertResultBody) {
		return instance.post('/results', body)
	},
	deleteResult(_id: string) {
		return instance.delete<{ id: string }>(`/results/${_id}`)
	},
}
