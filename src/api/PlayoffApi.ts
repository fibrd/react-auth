import axios from 'axios'
import { Fixture, UpsertFixtureBody } from '../types/playoff'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const PlayoffApi = {
	getFixtures() {
		return instance.get<{ fixtures: Fixture[] }>('/fixtures')
	},
	upsertFixture(body: UpsertFixtureBody) {
		return instance.post('/fixtures', body)
	},
	deleteFixture(_id: string) {
		return instance.delete<{ id: string }>(`/fixtures/${_id}`)
	},
}
