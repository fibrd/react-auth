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
