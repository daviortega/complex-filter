'use strict'


// const filterType = require('./filterType')


const buildFilter = (query) => {
    switch (query) {
        case 'filter':
            return 'true'
    }
}
 
const makeFilter = (queryStack) => {
    let test = '*'
    queryStack.map((query) => {
        const f = buildFilter(query)
        test += f
    })
    // console.log(test)
    return (item) => {
        return (eval(test))
    }
}


module.exports = (queryStack) => {
    return makeFilter(queryStack)
}