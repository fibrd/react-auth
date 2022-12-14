import { SendEmailBody, ResetPasswordBody } from './../types/auth'
import axios from 'axios'
import { LoginBody, RegisterBody, User } from '../types/auth'

const instance = axios.create({
	withCredentials: true,
	baseURL: process.env.REACT_APP_API_BASE_URL + '/api',
})

export const AuthApi = {
	initUser() {
		return instance.post<{ user: User | null }>('/init')
	},

	register(body: RegisterBody) {
		return instance.post<{ message: string }>('/register', body)
	},

	login(body: LoginBody) {
		return instance.post<{ message: string; user: User }>('/login', body)
	},

	logout() {
		return instance.get<{ message: string }>('/logout')
	},

	sendEmail(body: SendEmailBody) {
		return instance.post<{ message: string }>('/email', body)
	},

	validateLink(id: string, token: string) {
		return instance.get<{ email: string }>(`/link/${id}/${token}`)
	},

	resetPassword(id: string, token: string, body: ResetPasswordBody) {
		return instance.post<{ message: string }>(`/reset/${id}/${token}`, body)
	},
}
