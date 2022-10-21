import axios from 'axios'

export async function get<T>(url: string): Promise<T> {
	const result = await axios.get(url)
	return result.data
}

export function post<T>(url: string, body: T): Promise<void> {
	return axios.post(url, body)
}
