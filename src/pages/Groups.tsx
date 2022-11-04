import React from 'react'
import { AppPageWrapper } from '../components/common/AppPageWrapper'
import standingsData from '../data/standings.json'
import { GroupsTable } from '../components/GroupsTable'

export function Groups() {
	console.log(standingsData.response[0].league.standings)
	return (
		<AppPageWrapper>
			{standingsData.response[0].league.standings.map((standings, index) => (
				<GroupsTable key={index} standings={standings} />
			))}
		</AppPageWrapper>
	)
}
