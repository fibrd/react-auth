import React from 'react'
import { SnackbarContextType } from '../types/common'

const SnackbarContext = React.createContext<SnackbarContextType>({
	snackbarText: null,
	severity: 'info',
	showSnackbar: () => {},
	hideSnackbar: () => {},
})

export default SnackbarContext
