import axios from 'axios'
import { Tip } from '../types/tips'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const TipsApi = {
	getTips() {
		return instance.get<{ tips: unknown }>('/tips')
	},

	getTipsByUserId(userId: string) {
		return instance.get<{ tips: Tip[] }>(`/tips/${userId}`)
	},

	upsertTip(fixtureId: number, score: { home: number; away: number }) {
		const body = {
			fixtureId,
			home: score.home,
			away: score.away,
			userId: '6352bba34d5d9541d5dc5077',
		}
		return instance.post(`/tip`, body)
	},
}
