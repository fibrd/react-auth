export interface Result {
	_id: string
	fixtureId: number
	home: number
	away: number
}

export interface UpsertResultBody {
	fixtureId: number
	home: number
	away: number
}
