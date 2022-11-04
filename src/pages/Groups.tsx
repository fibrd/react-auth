import React from 'react'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import standingsData from '../data/standings.json'
import { GroupRow } from '../components/GroupRow'

export function Groups() {
	return (
		<AppPageWrapper>
			{standingsData.response[0].league.standings.map((standings, index) => (
				<GroupRow key={index} standings={standings} />
			))}
		</AppPageWrapper>
	)
}
