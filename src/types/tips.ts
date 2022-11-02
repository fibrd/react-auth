export interface UpsertTipBody extends Tip {
	userId: string
}

export interface Tip {
	fixtureId: number
	home: number
	away: number
}
