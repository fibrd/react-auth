import { DialogType } from '../types/common'
import { createContext, useState } from 'react'
import { Dialog } from '../types/common'

export const DialogContext = createContext<Dialog | null>(null)

export function useDialogContext() {
	const [dialogType, setDialogType] = useState<DialogType | null>(null)
	const showDialog = (type: DialogType) => setDialogType(type)
	const hideDialog = () => setDialogType(null)

	return { dialogType, showDialog, hideDialog }
}
