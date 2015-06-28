// Core modules
var fs = require('fs');
var path = require('path');

// Libraries
var _ = require('underscore');
var expect = require('expect.js');

// Application Code
var dwmlParser = require('../dwml-parser');


describe('DWML Parser', function () {
  var parsedData;

  before(function () {
    var testXmlFile = path.resolve(__dirname, './dwml.xml');
    var xmlString = fs.readFileSync(testXmlFile, 'utf8');
    parsedData = dwmlParser.parse(xmlString);
  });

  it('#parses', function () {
    expect(parsedData).to.eql(
      {
        point1: {
          precipitation: {
            type: 'liquid',
            units: 'inches',
            'time-layout': 'k-p6h-n13-2',
            "values": [
              { "end-time": "2015-06-27T20:00:00-04:00", "start-time": "2015-06-27T14:00:00-04:00", "value": "0.35"},
              { "end-time": "2015-06-28T02:00:00-04:00", "start-time": "2015-06-27T20:00:00-04:00", "value": "0.37"},
              { "end-time": "2015-06-28T08:00:00-04:00", "start-time": "2015-06-28T02:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-28T14:00:00-04:00", "start-time": "2015-06-28T08:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-28T20:00:00-04:00", "start-time": "2015-06-28T14:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-29T02:00:00-04:00", "start-time": "2015-06-28T20:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-29T08:00:00-04:00", "start-time": "2015-06-29T02:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-29T14:00:00-04:00", "start-time": "2015-06-29T08:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-29T20:00:00-04:00", "start-time": "2015-06-29T14:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-30T02:00:00-04:00", "start-time": "2015-06-29T20:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-30T08:00:00-04:00", "start-time": "2015-06-30T02:00:00-04:00", "value": "0.00"},
              { "end-time": "2015-06-30T14:00:00-04:00", "start-time": "2015-06-30T08:00:00-04:00", "value": "0.01"},
              { "end-time": "2015-06-30T20:00:00-04:00", "start-time": "2015-06-30T14:00:00-04:00", "value": "0.13"}
            ]
          },
          'probability-of-precipitation': {
            type: '12 hour',
            units: 'percent',
            'time-layout': 'k-p12h-n7-1',
            values: [
                { "end-time": "2015-06-27T20:00:00-04:00", "start-time": "2015-06-27T08:00:00-04:00", "value": "100"},
                { "end-time": "2015-06-28T08:00:00-04:00", "start-time": "2015-06-27T20:00:00-04:00", "value": "88"},
                { "end-time": "2015-06-28T20:00:00-04:00", "start-time": "2015-06-28T08:00:00-04:00", "value": "6"},
                { "end-time": "2015-06-29T08:00:00-04:00", "start-time": "2015-06-28T20:00:00-04:00", "value": "6"},
                { "end-time": "2015-06-29T20:00:00-04:00", "start-time": "2015-06-29T08:00:00-04:00", "value": "3"},
                { "end-time": "2015-06-30T08:00:00-04:00", "start-time": "2015-06-29T20:00:00-04:00", "value": "15"},
                { "end-time": "2015-06-30T20:00:00-04:00", "start-time": "2015-06-30T08:00:00-04:00", "value": "51"}
            ]
          },
          location: {
            latitude: '38.99',
            longitude: '-77.01'
          }
        },
        point2: {
          precipitation: {
            type: 'liquid',
            units: 'inches',
            'time-layout': 'k-p6h-n13-4',
            values: [
              { "end-time": "2015-06-27T17:00:00-07:00", "start-time": "2015-06-27T11:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-27T23:00:00-07:00", "start-time": "2015-06-27T17:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-28T05:00:00-07:00", "start-time": "2015-06-27T23:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-28T11:00:00-07:00", "start-time": "2015-06-28T05:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-28T17:00:00-07:00", "start-time": "2015-06-28T11:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-28T23:00:00-07:00", "start-time": "2015-06-28T17:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-29T05:00:00-07:00", "start-time": "2015-06-28T23:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-29T11:00:00-07:00", "start-time": "2015-06-29T05:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-29T17:00:00-07:00", "start-time": "2015-06-29T11:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-29T23:00:00-07:00", "start-time": "2015-06-29T17:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-30T05:00:00-07:00", "start-time": "2015-06-29T23:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-30T11:00:00-07:00", "start-time": "2015-06-30T05:00:00-07:00", "value": "0.00"},
              { "end-time": "2015-06-30T17:00:00-07:00", "start-time": "2015-06-30T11:00:00-07:00", "value": "0.00"}
            ]
          },
          'probability-of-precipitation': {
            type: '12 hour',
              units: 'percent',
              'time-layout': 'k-p12h-n7-3',
              values: [
                { "end-time": "2015-06-27T17:00:00-07:00", "start-time": "2015-06-27T05:00:00-07:00", "value": "1" },
                { "end-time": "2015-06-28T05:00:00-07:00", "start-time": "2015-06-27T17:00:00-07:00", "value": "6" },
                { "end-time": "2015-06-28T17:00:00-07:00", "start-time": "2015-06-28T05:00:00-07:00", "value": "6" },
                { "end-time": "2015-06-29T05:00:00-07:00", "start-time": "2015-06-28T17:00:00-07:00", "value": "2" },
                { "end-time": "2015-06-29T17:00:00-07:00", "start-time": "2015-06-29T05:00:00-07:00", "value": "3" },
                { "end-time": "2015-06-30T05:00:00-07:00", "start-time": "2015-06-29T17:00:00-07:00", "value": "0" },
                { "end-time": "2015-06-30T17:00:00-07:00", "start-time": "2015-06-30T05:00:00-07:00", "value": "0" }
              ]
          },
          location: {
            latitude: '37.78',
            longitude: '-122.42'
          }
        }
      }
    );
  });
});