interface Parameters {
	league: string
	season: string
}

interface Paging {
	current: number
	total: number
}

interface Periods {
	first?: any
	second?: any
}

interface Venue {
	id?: any
	name: string
	city: string
}

interface Status {
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

interface League {
	id: number
	name: string
	country: string
	logo: string
	flag?: any
	season: number
	round: string
}

interface Home {
	id: number
	name: string
	logo: string
	winner?: any
}

interface Away {
	id: number
	name: string
	logo: string
	winner?: any
}

export interface Teams {
	home: Home
	away: Away
}

interface Goals {
	home?: any
	away?: any
}

interface Halftime {
	home?: any
	away?: any
}

interface Fulltime {
	home?: any
	away?: any
}

interface Extratime {
	home?: any
	away?: any
}

interface Penalty {
	home?: any
	away?: any
}

interface Score {
	halftime: Halftime
	fulltime: Fulltime
	extratime: Extratime
	penalty: Penalty
}

interface Response {
	fixture: Fixture
	league: League
	teams: Teams
	goals: Goals
	score: Score
}

interface RootObject {
	get: string
	parameters: Parameters
	errors: any[]
	results: number
	paging: Paging
	response: Response[]
}
