'use strict'

const buildFilter = (queryStack, association = '&&') => {
	let testString = ''
	let limits = []
	queryStack.map((query, i) => {
		if (i !== 0)
			testString += ` ${association} `
		if (query.searchType === 'between')
			limits = query.searchFor.split(';').map(parseFloat)
		switch (query.type) {
			case 'filter':
				switch (typeof query.searchFor) {
					case 'string':
						switch (query.searchType) {
							case 'contains':
								testString += `item.${query.searchOn}.match('${query.searchFor}')`
								break
							case 'exact':
								testString += `item.${query.searchOn} === '${query.searchFor}'`
								break
							case 'startsWith':
								testString += `item.${query.searchOn}.match('^${query.searchFor}')`
								break
							case 'endsWith':
								testString += `item.${query.searchOn}.match('${query.searchFor}$')`
								break
							case 'regex':
								testString += `item.${query.searchOn}.match(/${query.searchFor}/)`
								break
							case 'between':
								testString += `item.${query.searchOn} > ${limits[0]} && item.${query.searchOn} < ${limits[1]}`
								break
						}
						break
					case 'number':
						switch (query.searchType) {
							case 'exactValue':
								testString += `item.${query.searchOn} === ${query.searchFor}`
								break
							case 'lessThan':
								testString += `item.${query.searchOn} < ${query.searchFor}`
								break
							case 'greaterThan':
								testString += `item.${query.searchOn} > ${query.searchFor}`
								break
						}
						break
				}
				break
			case 'AND':
				testString += buildFilter(query.args, '&&')
				break
			case 'OR':
				testString += buildFilter(query.args, '||')
				break
		}
		if (query.not)
			testString = `!(${testString})`
	})
	if (queryStack.length > 1)
		testString = `(${testString})`
	return testString
}

module.exports = buildFilter
