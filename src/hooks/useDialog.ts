import { DialogType } from './../types/common'
import { useState } from 'react'

export function useDialog() {
	const [dialogType, setDialogType] = useState<DialogType | null>(null)
	const showDialog = (type: DialogType) => setDialogType(type)
	const hideDialog = () => setDialogType(null)

	return { dialogType, showDialog, hideDialog }
}
