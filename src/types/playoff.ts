export interface Fixture {
	_id: string
	fixtureId: number
	homeTeam: string
	awayTeam: string
}

export interface UpsertFixtureBody {
	fixtureId: number
	homeTeam: string
	awayTeam: string
}
