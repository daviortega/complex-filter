'use strict'

module.exports = (query) => {
    console.log(query)
    return (item) => {
        switch (query.searchType) {
            case 'contains':
                return item[queryStack[0].searchOn].match(queryStack[0].searchFor)
        }
    }
}
