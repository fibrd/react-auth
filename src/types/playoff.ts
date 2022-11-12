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

export enum FixtureType {
	ROUND_OF_16 = 'Round of 16',
	QUARTER_FINAL = 'Quarter-final',
	SEMI_FINAL = 'Semi-final',
	FINAL = 'Final',
}
