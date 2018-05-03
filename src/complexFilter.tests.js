/* eslint-disable no-magic-numbers */
'use strict'

const chai = require('chai')
const path = require('path')
const fs = require('fs')

const expect = chai.expect
const should = chai.should

const complexFilter = require('./complexFilter')

const dataTestPath = path.resolve(__dirname, '..', 'dataTest')
const objectsFilename = path.resolve(dataTestPath, 'objects.json')
const nestedObjectsFilename = path.resolve(dataTestPath, 'objects.nested.json')

describe('complexFilter', function() {
	describe('simple queries and different searchTypes', function() {
		it('should match anywhere with "contains"', function() {
			const expected = [
				{
					"date": 1180483200,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: Fe-metabolizing bacterium that makes parallel membrane sheets for photosynthesis.  Membrane topology is the primary interest.\r\nKeywords: photosynthetic membrane sheets, parallel membranes\n",
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"defocus": -10,
					"dosage": 200,
					"tiltConstant": 1,
					"tiltMin": -65,
					"tiltMax": 65,
					"tiltStep": 1,
					"microscopist": "Gavin Murphy",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "bt2007-05-30-1"
				   },
					{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
					},
					{
						"date": 1237939200,
						"NCBItaxID": 80880,
						"speciesName": "Campylobacter jejuni",
						"tiltSingleDual": 1,
						"tiltConstant": 1,
						"microscopist": "Davi R. Ortega",
						"institution": "Caltech",
						"lab": "Jensen Lab",
						"sid": "am2009-03-25-16"
					}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "av",
					"searchOn": "microscopist",
					"searchType": "contains"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match exact with "exact"', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi Ortega",
					"searchOn": "microscopist",
					"searchType": "exact"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match at the beginning with "startsWith"', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi O",
					"searchOn": "microscopist",
					"searchType": "startsWith"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should not match anywhere else with "startsWith"', function() {
			const expected = []
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "avi O",
					"searchOn": "microscopist",
					"searchType": "startsWith"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match at the end with "endsWith"', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "i Ortega",
					"searchOn": "microscopist",
					"searchType": "endsWith"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match regex with "regex"', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "^Davi Ortega$",
					"searchOn": "microscopist",
					"searchType": "regex"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match regex with "regex"', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				},
				{
					"NCBItaxID": 80880,
					"date": 1237939200,
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"microscopist": "Davi R. Ortega",
					"sid": "am2009-03-25-16",
					"speciesName": "Campylobacter jejuni",
					"tiltConstant": 1,
					"tiltSingleDual": 1
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": ".*av.{1}\\b",
					"searchOn": "microscopist",
					"searchType": "regex"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})		
		it('should not match any using special regex characters in "contains"', function() {
			const expected = []
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "$Matt",
					"searchOn": "microscopist",
					"searchType": "contains"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match exact with "exactValue" with numbers', function() {
			const expected = [
				{
					"date": 1180569600,
					"NCBItaxID": 1076,
					"artNotes": "Tilt series notes: Fe-metabolizing bacterium that makes parallel membrane sheets for photosynthesis.  Membrane topology is the primary interest.\r\nKeywords: photosynthetic membrane sheets, parallel membranes\n",
					"speciesName": "Rhodopseudomonas palustris",
					"tiltSingleDual": 1,
					"defocus": -10,
					"dosage": 200,
					"tiltConstant": 1,
					"tiltMin": -65,
					"tiltMax": 65,
					"tiltStep": 1,
					"microscopist": "Bill Tivol",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "bt2007-05-31-2"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": 1076,
					"searchOn": "NCBItaxID",
					"searchType": "exactValue"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match smaller values with "lessThan"', function() {
			const expected = [
				{
					"date": 1180569600,
					"NCBItaxID": 1076,
					"artNotes": "Tilt series notes: Fe-metabolizing bacterium that makes parallel membrane sheets for photosynthesis.  Membrane topology is the primary interest.\r\nKeywords: photosynthetic membrane sheets, parallel membranes\n",
					"speciesName": "Rhodopseudomonas palustris",
					"tiltSingleDual": 1,
					"defocus": -10,
					"dosage": 200,
					"tiltConstant": 1,
					"tiltMin": -65,
					"tiltMax": 65,
					"tiltStep": 1,
					"microscopist": "Bill Tivol",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "bt2007-05-31-2"
				},
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": 1078,
					"searchOn": "NCBItaxID",
					"searchType": "lessThan"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match larger values with "greaterThan"', function() {
			const expected = [
				{
					"date": 1132617600,
					"NCBItaxID": 90880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Pseudomonas aeruginosa",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Ariane Briegel",
					"institution": "Caltech",
					"lab": "Briegel Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": 90000,
					"searchOn": "NCBItaxID",
					"searchType": "greaterThan"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match values between two values passed as "between"', function() {
			const expected = [
				{
					"date": 1132617600,
					"NCBItaxID": 8080,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "5000;10000",
					"searchOn": "NCBItaxID",
					"searchType": "between"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
	})
	describe.skip('simple NOT queries', function() {
		it('transform of simple NOT query should work', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				},
				{
					"date": 1132617600,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Penn State",
					"lab": "Swulius Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": "Caltech",
					"searchOn": "institution",
					"searchType": "contains"
				}
			]
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
					.on('data', (chunk) => {
						results.push(chunk)
					})
					.on('finish', () => {
						expect(results).eql(expected)
					})
		})
		it('transform of simple with NOT omitted query should work', function() {
			const expected = [
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"searchFor": "Alasdair McDowall",
					"searchOn": "microscopist",
					"searchType": "contains"
				}
			]
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
					.on('data', (chunk) => {
						results.push(chunk)
					})
					.on('finish', () => {
						expect(results).eql(expected)
					})
		})
		it('should match different with NOT and "exactValue" with numbers', function() {
			const expected = [
				{
					"date": 1180569600,
					"NCBItaxID": 1076,
					"artNotes": "Tilt series notes: Fe-metabolizing bacterium that makes parallel membrane sheets for photosynthesis.  Membrane topology is the primary interest.\r\nKeywords: photosynthetic membrane sheets, parallel membranes\n",
					"speciesName": "Rhodopseudomonas palustris",
					"tiltSingleDual": 1,
					"defocus": -10,
					"dosage": 200,
					"tiltConstant": 1,
					"tiltMin": -65,
					"tiltMax": 65,
					"tiltStep": 1,
					"microscopist": "Bill Tivol",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "bt2007-05-31-2"
				   },
				   {
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				   },
				   {
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				   },
				   {
					"date": 1132617600,
					"NCBItaxID": 8080,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-3"
				   },
				   {
					"date": 1132617600,
					"NCBItaxID": 90880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Pseudomonas aeruginosa",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Ariane Briegel",
					"institution": "Caltech",
					"lab": "Briegel Lab",
					"sid": "ci2005-11-22-3"
				   }
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": 80880,
					"searchOn": "NCBItaxID",
					"searchType": "exactValue"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match smaller or equal values with NOT and "greaterThan"', function() {
			const expected = [
				{
					"date": 1180569600,
					"NCBItaxID": 1076,
					"artNotes": "Tilt series notes: Fe-metabolizing bacterium that makes parallel membrane sheets for photosynthesis.  Membrane topology is the primary interest.\r\nKeywords: photosynthetic membrane sheets, parallel membranes\n",
					"speciesName": "Rhodopseudomonas palustris",
					"tiltSingleDual": 1,
					"defocus": -10,
					"dosage": 200,
					"tiltConstant": 1,
					"tiltMin": -65,
					"tiltMax": 65,
					"tiltStep": 1,
					"microscopist": "Bill Tivol",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "bt2007-05-31-2"
				},
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": 1076,
					"searchOn": "NCBItaxID",
					"searchType": "greaterThan"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match larger or equal values with NOT and "lessThan', function() {
			const expected = [
				{
					"date": 1132617600,
					"NCBItaxID": 90880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Pseudomonas aeruginosa",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Ariane Briegel",
					"institution": "Caltech",
					"lab": "Briegel Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": 90880,
					"searchOn": "NCBItaxID",
					"searchType": "lessThan"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should match values not included between two values passed as "between"', function() {
			const expected = [
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				},
				{
					"date": 1132617600,
					"NCBItaxID": 90880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Pseudomonas aeruginosa",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Ariane Briegel",
					"institution": "Caltech",
					"lab": "Briegel Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": true,
					"searchFor": "197;90880",
					"searchOn": "NCBItaxID",
					"searchType": "between"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
	})
	describe.skip('AND and OR simple associations', function() {
		it('transform of two AND queries should work', function() {
			const expected = [
				{
					"date": 1132617600,
					"NCBItaxID": 8080,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-3"
				},
				{
					"date": 1132617600,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
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
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
				.on('data', (chunk) => {
					results.push(chunk)
				})
				.on('finish', () => {
					expect(results).eql(expected)
				})
		})
		it('transform of two OR queries should work', function() {
			const expected = [
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				},
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
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
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
				.on('data', (chunk) => {
					results.push(chunk)
				})
				.on('finish', () => {
					expect(results).eql(expected)
				})
		})
	})
	describe.skip('AND and OR complex associations', function() {
		it('transform of AND + OR queries should work', function() {
			const expected = [
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				},
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
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
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
				.on('data', (chunk) => {
					results.push(chunk)
				})
				.on('finish', () => {
					expect(results).eql(expected)
				})
		})
		it('another transform of AND + OR queries should work', function() {
			const expected = [
				{
					"date": 1245196800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2009-06-17-10"
				},
				{
					"date": 1308268800,
					"NCBItaxID": 197,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Alasdair McDowall",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "am2011-06-17-1"
				},
				{
					"date": 1180483200,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: Fe-metabolizing bacterium that makes parallel membrane sheets for photosynthesis.  Membrane topology is the primary interest.\r\nKeywords: photosynthetic membrane sheets, parallel membranes\n",
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"defocus": -10,
					"dosage": 200,
					"tiltConstant": 1,
					"tiltMin": -65,
					"tiltMax": 65,
					"tiltStep": 1,
					"microscopist": "Gavin Murphy",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "bt2007-05-30-1"
				},
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
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
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
				.on('data', (chunk) => {
					results.push(chunk)
				})
				.on('finish', () => {
					expect(results).eql(expected)
				})
		})
		it('one more transform of AND + OR queries should work', function() {
			const expected = [
				{
					"date": 1237939200,
					"NCBItaxID": 80880,
					"speciesName": "Campylobacter jejuni",
					"tiltSingleDual": 1,
					"tiltConstant": 1,
					"microscopist": "Davi Ortega",
					"institution": "ETDB",
					"lab": "Jensen Lab",
					"sid": "am2009-03-25-16"
				}
			]
			const objects = require(objectsFilename)
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
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
				.on('data', (chunk) => {
					results.push(chunk)
				})
				.on('finish', () => {
					expect(results).eql(expected)
				})
		})
		it('transform of nested AND + OR + AND queries should work', function() {
			const expected = [
				{
					"date": 1132617600,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h1 in normal conditions\r\nKeywords: carboxysomes, internal granules, partial carboxysomes, irregular carboxysome\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -12,
					"dosage": 150,
					"tiltConstant": 1,
					"microscopist": "Cristina Iancu",
					"institution": "notCaltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-1"
				   },
				   {
					"date": 1132617600,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h1 in normal conditions\r\nKeywords: carboxysomes, internal granules, partial carboxysomes, irregular carboxysome\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -12,
					"dosage": 150,
					"tiltConstant": 1,
					"microscopist": "Cristina Iancu",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-1"
				   },
				   {
					"date": 1132617600,
					"NCBItaxID": 8080,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-3"
				   },
				   {
					"date": 1132617600,
					"NCBItaxID": 80880,
					"artNotes": "Tilt series notes: H. neapolitanus cell h3 in normal conditions\r\nKeywords: carboxysomes, internal granules\n",
					"speciesName": "Halothiobacillus neapolitanus",
					"strain": "c2",
					"tiltSingleDual": 1,
					"defocus": -11,
					"dosage": 190,
					"tiltConstant": 1,
					"microscopist": "Matt Swulius",
					"institution": "Caltech",
					"lab": "Jensen Lab",
					"sid": "ci2005-11-22-3"
				}
			]
			const objects = require(objectsFilename)
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
			const filterStream = complexFilterStream(queryStack)
			const results = []
			objectStream
				.pipe(filterStream)
				.on('data', (chunk) => {
					results.push(chunk)
				})
				.on('finish', () => {
					expect(results).eql(expected)
				})
		})
	})
	describe.skip('handling exceptions', function() {
		it('should skip if searchFor fields is not found', function() {
			const expected = []
			const objects = require(objectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi Ortega",
					"searchOn": "biologist",
					"searchType": "exact"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should understand nested fields', function() {
			const expected = [
				{
					"level1": {
						"level2": {
							"date": 1237939200,
							"NCBItaxID": 80880,
							"speciesName": "Campylobacter jejuni",
							"tiltSingleDual": 1,
							"tiltConstant": 1,
							"microscopist": "Davi Ortega",
							"institution": "ETDB",
							"lab": "Jensen Lab",
							"sid": "am2009-03-25-16"
						}
					}
				}
			]
			const objects = require(nestedObjectsFilename)
			const queryStack = [
				{
					"type": "filter",
					"not": false,
					"searchFor": "Davi Ortega",
					"searchOn": "level1.level2.microscopist",
					"searchType": "exact"
				}
			]
			const results = objects.filter(complexFilter(queryStack))
			expect(results).eql(expected)
		})
		it('should throw error if rules are bad', function() {
			const badQueryStack = [ 
				{ 
					type: 'simple',
					searchOn: 'microscopist',
					searchType: 'contains',
					searchFor: 'Gavin Murphy'
				} 
			]

			expect( () => { complexFilterStream(badQueryStack) }).to.throw('Something is wrong with your queryStack')
		})
	})
})
