import { DialogType } from '../types/common'
import { createContext, useState } from 'react'
import { Dialog } from '../types/common'

export const DialogContext = createContext<Dialog | null>(null)

export function useDialogContext() {
	const [dialogType, setDialogType] = useState<DialogType | null>(null)
	const [dialogData, setDialogData] = useState<unknown>(null)
	const showDialog = (type: DialogType, data?: unknown) => {
		setDialogType(type)
		setDialogData(data ?? null)
	}
	const hideDialog = () => setDialogType(null)

	return { dialogType, dialogData, showDialog, hideDialog }
}
