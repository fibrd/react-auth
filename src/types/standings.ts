interface League {
	id: number
	name: string
	country: string
	logo: string
	flag?: any
	season: number
	standings: Standing[][]
}

export interface Standing {
	rank: number
	team: Team
	points: number
	goalsDiff: number
	group: string
	form?: any
	status: string
	description: string | null
	all: All
	home: All
	away: All
	update: string
}

interface Team {
	id: number
	name: string
	logo: string
}

interface Goals {
	for: number | null
	against: number | null
}

interface All {
	played: number | null
	win: number | null
	draw: number | null
	lose: number | null
	goals: Goals
}
