const ONE_HOUR = 1000 * 60 * 60
const ONE_DAY = 24 * ONE_HOUR

export function isBettingDisabled(timestampInSeconds: number) {
	return timestampInSeconds * 1000 < new Date().getTime()
}

export function getLocalString(timestampInSeconds: number) {
	return new Date(timestampInSeconds * 1000).toLocaleString([], {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

export function getShortName(name: string) {
	return name.substring(0, 3).toUpperCase()
}

export function isOldTip(timestampInSeconds: number) {
	return timestampInSeconds * 1000 < new Date().getTime() - ONE_DAY
}
