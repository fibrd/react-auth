import React from 'react'
import { AuthContextType } from '../types/common'

const AuthContext = React.createContext<AuthContextType>({
	user: null,
	login: () => {},
	logout: () => {},
})

export default AuthContext
