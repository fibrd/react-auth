import { SendEmailBody, ResetPasswordBody } from './../types/auth'
import axios from 'axios'
import { BASE_URL } from '../helpers/constants'
import { LoginBody, RegisterBody, User } from '../types/auth'

const instance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
})

export const AuthApi = {
	register(body: RegisterBody) {
		return instance.post<{ message: string }>('/register', body)
	},

	login(body: LoginBody) {
		return instance.post<{ message: string; user: User; token: string }>(
			'/login',
			body
		)
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
