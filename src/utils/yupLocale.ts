export const mixed = {
	default: 'Hodnota v "${path}" je neplatná',
	required: 'Pole "${path}" je povinné',
	oneOf: '"${path}" musí obsahovat jednu z následujících hodnot: ${values}',
	notOneOf:
		'"${path}" nesmí obsahovat žádnou z následujících hodnot: ${values}',
}

export const string = {
	length: '"${path}" musí obsahovat přesně ${length} znaků',
	min: '"${path}" musí obsahovat minimálně ${min} znaků',
	max: '"${path}" musí obsahovat maximálně ${max} znaků',
	matches: '"${path}" musí splňovat pravidlo: "${regex}"',
	email: '"${path}" musí být platná emailová adresa',
	url: '"${path}" musí být platná URL adresa',
	trim: '"${path}" nesmí obsahovat mezery',
	lowercase: '"${path}" musí obsahovat jen malá písmena',
	uppercase: '"${path}" musí obsahovat jen velká písmena',
}

export const number = {
	min: '"${path}" musí být větší nebo rovno ${min}',
	max: '"${path}" musí být menší nebo rovno ${max}',
	lessThan: '"${path}" musí být menší než ${less}',
	moreThan: '"${path}" musí být větší než ${more}',
	notEqual: '"${path}" se nesmí rovnat "${notEqual}"',
	positive: '"${path}" musí být kladné číslo',
	negative: '"${path}" musí být záporné číslo',
	integer: '"${path}" musí být celé číslo',
}

export const date = {
	min: '"${path}" musí být po ${min}',
	max: '"${path}" musí být před ${max}',
}

export const boolean = {}

export const object = {
	noUnknown: 'Objekt "${path}" nesmí obsahovat nespecifikované klíče',
}

export const array = {
	min: 'Pole "${path}" musí obsahovat alespoň ${min} položky',
	max: 'Pole "${path}" musí obsahova maximálně ${max} položky',
}
