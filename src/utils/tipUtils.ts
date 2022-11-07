import { Result } from '../types/results'
import { Tip, TipResult } from '../types/tips'

export function getTipResult(
	scoreTip: Pick<Tip, 'home' | 'away'>,
	scoreResult: Pick<Result, 'home' | 'away'>
): TipResult {
	const { home: homeTip, away: awayTip } = scoreTip
	const { home: homeResult, away: awayResult } = scoreResult

	if (homeTip === homeResult && awayTip === awayResult) {
		return TipResult.CORRECT
	}

	if (homeTip - awayTip === homeResult - awayResult) {
		return TipResult.SCORE_DIFF_CORRECT
	}

	if (
		(homeTip > awayTip && homeResult > awayResult) ||
		(homeTip < awayTip && homeResult < awayResult)
	) {
		return TipResult.WINNER_CORRECT
	}

	return TipResult.WRONG
}

export function getTipResultPoints(
	scoreTip: Pick<Tip, 'home' | 'away'>,
	scoreResult: Pick<Result, 'home' | 'away'>
): number {
	const tipResult = getTipResult(scoreTip, scoreResult)

	switch (tipResult) {
		case TipResult.CORRECT:
			return 5
		case TipResult.SCORE_DIFF_CORRECT:
			return 2
		case TipResult.WINNER_CORRECT:
			return 1
		case TipResult.WRONG:
		default:
			return 0
	}
}
