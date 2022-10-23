import { DialogType } from '../types/common'
import { createContext, useState } from 'react'
import { DialogContextType } from '../types/common'

export const DialogContext = createContext<DialogContextType>({
	dialogType: null,
	showDialog: () => {},
	hideDialog: () => {},
})

export function useDialogContext() {
	const [dialogType, setDialogType] = useState<DialogType | null>(null)
	const showDialog = (type: DialogType) => setDialogType(type)
	const hideDialog = () => setDialogType(null)

	return { dialogType, showDialog, hideDialog }
}
