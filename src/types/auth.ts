export interface User {
	email: string
	username: string
	role: string
	userId: string
}

export interface Auth {
	isInitialized: boolean
	user: User | null
	login: (user: User | null) => void
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

export interface SendEmailBody {
	email: string
}

export interface ResetPasswordBody {
	password: string
}
