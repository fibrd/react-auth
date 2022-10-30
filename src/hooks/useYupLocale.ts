import { useEffect } from 'react'
import { setLocale } from 'yup'
import {
	mixed,
	string,
	number,
	date,
	boolean,
	object,
	array,
} from '../utils/yupLocale'

export function useYupLocale() {
	useEffect(() => {
		setLocale({ mixed, string, number, date, boolean, object, array })
	}, [])
}
