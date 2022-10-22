import React from 'react'
import { DialogContextType } from '../types/common'

const DialogContext = React.createContext<DialogContextType>({
	dialogType: null,
	showDialog: () => {},
	hideDialog: () => {},
})

export default DialogContext
