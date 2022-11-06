export interface UpsertTipBody extends Tip {
	userId: string
}

export interface AuthorizeTipBody {
	userId: string
	authorized: boolean
}

export interface Tip {
	fixtureId: number
	home: number
	away: number
}

export interface TipRow {
	tips: Tip[]
	authorized: boolean
	userId: string
	username: string
}

export enum TipResult {
	CORRECTED = 'corrected',
	PARTIALLY_CORRECTED = 'partially_corrected',
	WRONG = 'wrong',
}
