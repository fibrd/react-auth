export interface User {
	email: string
	username: string
	role: string
}

export interface Auth {
	user: User | null
	login: (user: User) => void
	logout: () => void
}

export interface RegisterBody {
	email: string
	username: string
	password: string
}

export interface LoginBody {
	email: string
	password: string
}

export interface ForgottenPasswordBody {
	email: string
}

export interface ResetPasswordBody {
	password: string
}
