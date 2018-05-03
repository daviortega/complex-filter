'use strict'

const buildFilter = require('./buildFilter')

// const filterType = require('./filterType')
 
const makeFilter = (queryStack) => {
    const testString = buildFilter(queryStack)
    return (item) => {
        return (eval(testString))
    }
}

module.exports = (queryStack) => {
    return makeFilter(queryStack)
}