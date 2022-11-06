import { Result } from '../types/results'
import { Tip, TipResult } from '../types/tips'

export function getTipResult(
	scoreTip: Pick<Tip, 'home' | 'away'>,
	scoreResult: Pick<Result, 'home' | 'away'>
): TipResult {
	const { home: homeTip, away: awayTip } = scoreTip
	const { home: homeResult, away: awayResult } = scoreResult

	if (homeTip === homeResult && awayTip === awayResult) {
		return TipResult.CORRECTED
	}

	if (homeTip - awayTip === 0 && homeResult - awayResult === 0) {
		return TipResult.PARTIALLY_CORRECTED
	}

	if (homeTip - awayTip > 0 && homeResult - awayResult > 0) {
		return TipResult.PARTIALLY_CORRECTED
	}

	if (homeTip - awayTip < 0 && homeResult - awayResult < 0) {
		return TipResult.PARTIALLY_CORRECTED
	}

	return TipResult.WRONG
}

export function getTipResultPoints(
	scoreTip: Pick<Tip, 'home' | 'away'>,
	scoreResult: Pick<Result, 'home' | 'away'>
): number {
	const tipResult = getTipResult(scoreTip, scoreResult)

	switch (tipResult) {
		case TipResult.CORRECTED:
			return 4
		case TipResult.PARTIALLY_CORRECTED:
			return 1
		case TipResult.WRONG:
		default:
			return 0
	}
}
