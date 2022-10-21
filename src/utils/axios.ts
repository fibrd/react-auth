import axios from 'axios'

export async function get<T>(url: string): Promise<T> {
	const result = await axios.get(url)
	return result.data
}
