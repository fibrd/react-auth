import { useContext } from 'react'
import { DialogContext } from '../context/dialogContext'

export function useDialog() {
	const dialog = useContext(DialogContext)
	if (dialog === null) {
		throw new Error('DialogContext nebyl inicializován.')
	}
	return dialog
}
