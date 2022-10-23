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
}
