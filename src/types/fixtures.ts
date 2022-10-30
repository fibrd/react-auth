export interface Parameters {
	league: string
	season: string
}

export interface Paging {
	current: number
	total: number
}

export interface Periods {
	first?: any
	second?: any
}

export interface Venue {
	id?: any
	name: string
	city: string
}

export interface Status {
	long: string
	short: string
	elapsed?: any
}

export interface Fixture {
	id: number
	referee?: any
	timezone: string
	date: string
	timestamp: number
	periods: Periods
	venue: Venue
	status: Status
}

export interface League {
	id: number
	name: string
	country: string
	logo: string
	flag?: any
	season: number
	round: string
}

export interface Home {
	id: number
	name: string
	logo: string
	winner?: any
}

export interface Away {
	id: number
	name: string
	logo: string
	winner?: any
}

export interface Teams {
	home: Home
	away: Away
}

export interface Goals {
	home?: any
	away?: any
}

export interface Halftime {
	home?: any
	away?: any
}

export interface Fulltime {
	home?: any
	away?: any
}

export interface Extratime {
	home?: any
	away?: any
}

export interface Penalty {
	home?: any
	away?: any
}

export interface Score {
	halftime: Halftime
	fulltime: Fulltime
	extratime: Extratime
	penalty: Penalty
}

export interface Response {
	fixture: Fixture
	league: League
	teams: Teams
	goals: Goals
	score: Score
}

export interface RootObject {
	get: string
	parameters: Parameters
	errors: any[]
	results: number
	paging: Paging
	response: Response[]
}
