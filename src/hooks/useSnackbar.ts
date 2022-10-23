import { useContext } from 'react'
import { SnackbarContext } from '../context/snackbarContext'

export function useSnackbar() {
	const snackbar = useContext(SnackbarContext)
	if (snackbar === null) {
		throw new Error('SnackbarContext nebyl inicializován.')
	}
	return snackbar
}
