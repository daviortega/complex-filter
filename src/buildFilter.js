'use strict'

module.exports = (queryStack) => {
	let testString = ''
	let limits = []
	queryStack.map((query) => {
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
		}
	})
	return testString
}
