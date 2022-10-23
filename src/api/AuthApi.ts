import axios from 'axios'
import { BASE_URL } from '../helpers/constants'
import { LoginRequestBody, RegisterRequestBody } from '../types/common'
import { User } from '../types/users'

const instance = axios.create({
	withCredentials: true,
	baseURL: BASE_URL,
})

export const AuthApi = {
	register(body: RegisterRequestBody) {
		return instance.post<{ message: string }>('/register', body)
	},

	login(body: LoginRequestBody) {
		return instance.post<{ message: string; user: User; token: string }>(
			'/login',
			body
		)
	},

	logout() {
		return instance.get<{ message: string }>('/logout')
	},
}
