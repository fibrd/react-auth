export enum Section {
	REGISTRATION = 'registration',
	LOGIN = 'login',
}

export interface RegisterRequestBody {
	email: string
	username: string
	password: string
}
