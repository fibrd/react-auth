export interface UpsertTipBody extends Tip {
	userId: string
}

export interface Tip extends Score {
	fixtureId: number
}

export interface Score {
	home: number
	away: number
}
