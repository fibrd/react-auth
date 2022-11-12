import { colors } from '@mui/material'
import { FixtureType } from '../types/playoff'
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
	scoreResult: Pick<Result, 'home' | 'away'>,
	matchType?: FixtureType
): number {
	const tipResult = getTipResult(scoreTip, scoreResult)
	let points = 0

	switch (tipResult) {
		case TipResult.CORRECT:
			points = 5
			break
		case TipResult.SCORE_DIFF_CORRECT:
			points = 2
			break
		case TipResult.WINNER_CORRECT:
			points = 1
			break
		case TipResult.WRONG:
		default:
			points = 0
			break
	}

	return matchType === FixtureType.FINAL ? points * 2 : points
}

export function getStyleByTipResult(tipResult: TipResult) {
	switch (tipResult) {
		case TipResult.CORRECT:
			return {
				padding: '4px 8px',
				borderRadius: '50%',
				border: `2px solid ${colors.green.A700}`,
			}
		case TipResult.SCORE_DIFF_CORRECT:
			return {
				padding: '4px 8px',
				borderRadius: '50%',
				border: `2px dashed ${colors.green.A700}`,
			}
		case TipResult.WINNER_CORRECT:
			return {
				padding: '4px 8px',
				borderRadius: '50%',
				border: `2px dotted ${colors.green.A700}`,
			}
		case TipResult.WRONG:
			return {
				textDecoration: 'line-through',
			}
	}
}
