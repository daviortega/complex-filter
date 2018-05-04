/* eslint-disable no-magic-numbers */
'use strict'

const chai = require('chai')
const expect = chai.expect
const buildFilter = require('./buildFilter')

describe('buildFilter', function() {
	describe('simple queries and different searchTypes', function() {
		it('should match anywhere with "contains"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "av",
					"searchOn": "microscopist",
					"searchType": "contains"
				}
			]
			const expected = "item.microscopist.match('av')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match exact with "exact"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi Ortega",
					"searchOn": "microscopist",
					"searchType": "exact"
				}
			]
			const expected = "item.microscopist === 'Davi Ortega'"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match at the beginning with "startsWith"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi O",
					"searchOn": "microscopist",
					"searchType": "startsWith"
				}
			]
			const expected = "item.microscopist.match('^Davi O')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match at the end with "endsWith"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "i Ortega",
					"searchOn": "microscopist",
					"searchType": "endsWith"
				}
			]
			const expected = "item.microscopist.match('i Ortega$')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match regex with "regex"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "^Davi Ortega$",
					"searchOn": "microscopist",
					"searchType": "regex"
				}
			]
			const expected = "item.microscopist.match(/^Davi Ortega$/)"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match complicated regex with "regex"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": ".*av.{1}\\b",
					"searchOn": "microscopist",
					"searchType": "regex"
				}
			]
			const expected = "item.microscopist.match(/.*av.{1}\\b/)"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should not match any using special regex characters in "contains"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "$Matt",
					"searchOn": "microscopist",
					"searchType": "contains"
				}
			]
			const expected = "item.microscopist.match('$Matt')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match exact with "exactValue" with numbers', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": 1076,
					"searchOn": "NCBItaxID",
					"searchType": "exactValue"
				}
			]
			const expected = "item.NCBItaxID === 1076"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match smaller values with "lessThan"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": 1078,
					"searchOn": "NCBItaxID",
					"searchType": "lessThan"
				}
			]
			const expected = "item.NCBItaxID < 1078"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match larger values with "greaterThan"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": 90000,
					"searchOn": "NCBItaxID",
					"searchType": "greaterThan"
				}
			]
			const expected = "item.NCBItaxID > 90000"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match values between two values passed as "between"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "5000;10000",
					"searchOn": "NCBItaxID",
					"searchType": "between"
				}
			]
			const expected = "item.NCBItaxID > 5000 && item.NCBItaxID < 10000"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
	})
	describe('simple NOT queries', function() {
		it('transform of simple NOT query should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": "Caltech",
					"searchOn": "institution",
					"searchType": "contains"
				}
			]
			const expected = "!(item.institution.match('Caltech'))"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('transform of simple with NOT omitted query should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"searchFor": "Alasdair McDowall",
					"searchOn": "microscopist",
					"searchType": "contains"
				}
			]
			const expected = "item.microscopist.match('Alasdair McDowall')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match different with NOT and "exactValue" with numbers', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": 80880,
					"searchOn": "NCBItaxID",
					"searchType": "exactValue"
				}
			]
			const expected = "!(item.NCBItaxID === 80880)"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match smaller or equal values with NOT and "greaterThan"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": 1076,
					"searchOn": "NCBItaxID",
					"searchType": "greaterThan"
				}
			]
			const expected = "!(item.NCBItaxID > 1076)"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match larger or equal values with NOT and "lessThan', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": 90880,
					"searchOn": "NCBItaxID",
					"searchType": "lessThan"
				}
			]
			const expected = "!(item.NCBItaxID < 90880)"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('should match values not included between two values passed as "between"', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": "197;90880",
					"searchOn": "NCBItaxID",
					"searchType": "between"
				}
			]
			const expected = "!(item.NCBItaxID > 197 && item.NCBItaxID < 90880)"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
	})
	describe('AND and OR simple associations', function() {
		it('transform of two AND queries should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Matt Swulius",
					"searchOn": "microscopist",
					"searchType": "contains"
				},
				{
					"type": "filter",
					"not": false,
					"searchFor": "Caltech",
					"searchOn": "institution",
					"searchType": "contains"
				}
			]
			const expected = "(item.microscopist.match('Matt Swulius') && item.institution.match('Caltech'))"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('transform of two OR queries should work', function() {
			const queryStack = [
				{
					"type": "OR",
					"args": [
						{
							"type": "filter",
							"searchFor": "Davi Ortega",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{	"type": "filter",
							"searchFor": "Alasdair McDowall",
							"searchOn": "microscopist",
							"searchType": "exact"
						}
					]
				}
			]
			const expected = "(item.microscopist === 'Davi Ortega' || item.microscopist === 'Alasdair McDowall')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
	})
	describe('AND and OR complex associations', function() {
		it('transform of AND + OR queries should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"searchFor": "Campylobacter jejuni",
					"searchOn": "speciesName",
					"searchType": "exact"
				},
				{
					"type": "OR",
					"args": [
						{
							"type": "filter",
							"searchFor": "Davi Ortega",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{	"type": "filter",
							"searchFor": "Alasdair McDowall",
							"searchOn": "microscopist",
							"searchType": "exact"
						}
					]
				}
			]
			const expected = "(item.speciesName === 'Campylobacter jejuni' && (item.microscopist === 'Davi Ortega' || item.microscopist === 'Alasdair McDowall'))"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('another transform of AND + OR queries should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"searchFor": "Campylobacter jejuni",
					"searchOn": "speciesName",
					"searchType": "exact"
				},
				{
					"type": "OR",
					"args": [
						{
							"type": "filter",
							"searchFor": "Davi Ortega",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{	"type": "filter",
							"searchFor": "Alasdair McDowall",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{	"type": "filter",
							"searchFor": "Gavin Murphy",
							"searchOn": "microscopist",
							"searchType": "exact"
						}
					]
				}
			]
			const expected = "(item.speciesName === 'Campylobacter jejuni' && (item.microscopist === 'Davi Ortega' || item.microscopist === 'Alasdair McDowall' || item.microscopist === 'Gavin Murphy'))"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('one more transform of AND + OR queries should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"searchFor": "Campylobacter jejuni",
					"searchOn": "speciesName",
					"searchType": "exact"
				},
				{
					"type": "OR",
					"args": [
						{
							"type": "filter",
							"searchFor": "Davi Ortega",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{	"type": "filter",
							"searchFor": "Alasdair McDowall",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{	"type": "filter",
							"searchFor": "Gavin Murphy",
							"searchOn": "microscopist",
							"searchType": "exact"
						}
					]
				},
				{
					"type": "filter",
					"searchFor": "ETDB",
					"searchOn": "institution",
					"searchType": "exact"
				}
			]
			const expected = "(item.speciesName === 'Campylobacter jejuni' && (item.microscopist === 'Davi Ortega' || item.microscopist === 'Alasdair McDowall' || item.microscopist === 'Gavin Murphy') && item.institution === 'ETDB')"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
		it('transform of nested AND + OR + AND queries should work', function() {
			const queryStack = [
				{
					"type": "filter",
					"searchFor": "Halothiobacillus neapolitanus",
					"searchOn": "speciesName",
					"searchType": "exact",
				},
				{
					"type": "OR",
					"args": [
						{
							"type": "filter",
							"searchFor": "Cristina Iancu",
							"searchOn": "microscopist",
							"searchType": "exact"
						},
						{
							"type": "AND",
							"args": [
								{	"type": "filter",
									"searchFor": "Matt Swulius",
									"searchOn": "microscopist",
									"searchType": "exact",
								},
								{	"type": "filter",
									"searchFor": "Jensen Lab",
									"searchOn": "lab",
									"searchType": "exact",
								},
							]
						}
					]
				}
			]
			const expected = "(item.speciesName === 'Halothiobacillus neapolitanus' && (item.microscopist === 'Cristina Iancu' || (item.microscopist === 'Matt Swulius' && item.lab === 'Jensen Lab')))"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
	})
	describe('handling exceptions', function() {
		it('should understand nested fields', function() {
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi Ortega",
					"searchOn": "level1.level2.microscopist",
					"searchType": "exact"
				}
			]
			const expected = "item.level1.level2.microscopist === 'Davi Ortega'"
			const results = buildFilter(queryStack)
			expect(results).eql(expected)
		})
	})
})
