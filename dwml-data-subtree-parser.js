var parse = require('xml-parser');
var _ = require('underscore');
var locationParser = require('./dwml-data-parsers/location');
var parameterParser = require('./dwml-data-parsers/parameter');
var timeLayoutParser = require('./dwml-data-parsers/time-layout');

/**
 * The way I've chosen to parse DWML environmental data is to do the following:
 *   1. Parse out the time-layouts per time-layout-key
 *   2. Parse parameters, grouped by location-id, with time-layout data mixed in (as each param has a time-layout-key)
 *   3. Parse out the location metadata (grouped by location-id)
 *   4. Merge location metadata and parameters (given that they're both grouped by location-id)
 *
 * @type {{parse: Function}}
 */
var dwmlDataSubtreeParser = {

  /**
   * @param dwmlDataSubtree {JSON}
   */
  parse: function (dwmlDataSubtree) {

    // Add time data into parameters as we parse them
    var timeLayouts = this._getTimeLayouts(dwmlDataSubtree.children);
    var parameters = this._getParameters(dwmlDataSubtree.children, timeLayouts);
    var locations = this._getLocations(dwmlDataSubtree.children);

    return this._mergeLocationsAndParameters(locations, parameters);
  },

  _getLocations: function (dataSets) {
    var locationDataSets = _.where(dataSets, { name: 'location' });
    var locationsArray = _.map(locationDataSets, locationParser.parse.bind(locationParser));
    return this._unwrap(locationsArray);
  },

  _getParameters: function (dataSets, timeLayouts) {
    var parameterDataSets = _.where(dataSets, { name: 'parameters' });
    var parametersArray = _.map(parameterDataSets, parameterParser.parse.bind(parameterParser, timeLayouts));
    return this._unwrap(parametersArray);
  },

  _getTimeLayouts: function (dataSets) {
    var timeLayoutDataSets = _.where(dataSets, { name: 'time-layout' });
    var timeLayoutArray = _.map(timeLayoutDataSets, timeLayoutParser.parse.bind(timeLayoutParser));
    return this._unwrap(timeLayoutArray);
  },

  _mergeLocationsAndParameters: function (locations, parameters) {
    return _.reduce(locations, function (memo, location, locationKey) {
      memo[locationKey] = _.extend(parameters[locationKey], {location: location} );
      return memo;
    }, {});
  },

  /**
   * @param arrayOfObjects {Array} - eg: [ { point1: {}, point2: {} } ]
   * @return {Object} - eg: { point1: {}, point2: {} }
   */
  _unwrap: function (arrayOfObjects) {
    return _.reduce(arrayOfObjects, function (memo, object) {
      return _.extend(memo, object);
    }, {});
  }

};

module.exports = dwmlDataSubtreeParser;