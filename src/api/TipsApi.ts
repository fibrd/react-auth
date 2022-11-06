import axios from 'axios'
import { Tip, TipRow, UpsertTipBody } from '../types/tips'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const TipsApi = {
	getAuthorizedTips() {
		return instance.get<TipRow[]>('/authorized-tips')
	},

	getTips() {
		return instance.get<TipRow[]>('/tips')
	},

	getTipsByUserId(userId: string) {
		return instance.get<{ tips: Tip[] }>(`/tips/${userId}`)
	},

	upsertTip(body: UpsertTipBody) {
		return instance.post('/tips', body)
	},
}
