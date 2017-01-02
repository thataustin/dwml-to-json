var _ = require('underscore');

var parameterParser = {

  /**
   * @param parameterDataSet {JSON} - essentially a <parameter> tag in a DWML tree, represented as JSON
   * @param timeLayouts {Object} - { layoutKey : Array<layoutObject> }
   */
  parse: function (timeLayouts, parameterDataSet) {

    var locationKey = this._getLocationKey(parameterDataSet);
    var parameters = parameterDataSet.children;

    var results = {};
    results[locationKey] = this._parseParameters(parameters, timeLayouts);
    return results;
  },

  _getLocationKey: function (parameterDataSet) {
    if (! (parameterDataSet && parameterDataSet.attributes && parameterDataSet.attributes['applicable-location']) ) {
      throw new Error('DWML parameters is missing child "attributes" (which must contain an "applicable-location"): ' + JSON.stringify(parameterDataSet));
    }
    return parameterDataSet.attributes['applicable-location'];
  },

  _parseParameters: function (parameters, timeLayouts) {

    return _.reduce(parameters, function (memo, dataSet) {

      var key = dataSet.name;
      memo[key] = memo[key] || {};

      // Extend destination begins as the entry for 'key'
      var destination = memo[key];

      // Check to see if there's a 'type' attribute.
      var type = dataSet.attributes['type'];

      // If there's a 'type' attribute, there could be more than 1 dataSet with the same name:
      // E.g. 'temperature' dataSets could be present for both 'maximum' and 'minimum' types.
      if (type) {
        // Create an empty nested object for the dataSet's type
        memo[key][type] = memo[key][type] || {};
        // Set the destination for the _.extend() call to be this nested object.
        destination = memo[key][type];
      }

      var layoutKey = dataSet.attributes['time-layout'];
      var timeFrames = timeLayouts[layoutKey];
      var values = this._formatValuesWithTimeLayouts(dataSet.children, timeFrames);

      /**
       * Mixin the attributes and the values that we've created to make this a much more consumable data structure,
       * while preserving most of the dwml language baked into the DWML xml tags
       */
      _.extend(destination, dataSet.attributes, { values: values });

      return memo;

    }, {}, this);
  },

  /**
    Change this

      children: [
        { name: 'name', attributes: {}, children: [], content: '12 Hourly Probability of Precipitation' },
        { name: 'value', attributes: {}, children: [], content: '1' },
        { name: 'value', attributes: {}, children: [], content: '6' },
        { name: 'value', attributes: {}, children: [], content: '6' },
        { name: 'value', attributes: {}, children: [], content: '2' },
        ...
      ]

    into this:

      [
        { 'start-time': [startTime], 'end-time': [endTime], value: '1'},
        { 'start-time': [startTime], 'end-time': [endTime], value: '6'},
        { 'start-time': [startTime], 'end-time': [endTime], value: '6'},
        { 'start-time': [startTime], 'end-time': [endTime], value: '2'},
        ...
      ]
  */
  _formatValuesWithTimeLayouts: function (values, timeFrames) {
    var i = 0, timeFrameCounter = 0, results = [], currentTimeFrame;

    while (i < values.length) {
      var currentValue = values[i];

      currentTimeFrame = timeFrames[timeFrameCounter];
      if (currentValue.name === 'value') {
        currentTimeFrame = timeFrames[timeFrameCounter];
        results.push(_.extend({}, currentTimeFrame, {value: currentValue.content }));
        timeFrameCounter++;
      }
      if (currentValue.name === 'weather-conditions') {
        currentTimeFrame = timeFrames[timeFrameCounter];
        var hasChildren = currentValue.children && currentValue.children.length > 0;

        var weather_condition = {
          summary: currentValue.attributes[ 'weather-summary' ],
          coverage: ( hasChildren ) ? currentValue.children[ 0 ].attributes.coverage : null,
          intensity: ( hasChildren ) ? currentValue.children[ 0 ].attributes.intensity : null,
          weather_type: ( hasChildren ) ? currentValue.children[ 0 ].attributes['weather-type'] : null,
          qualifier: ( hasChildren ) ? currentValue.children[ 0 ].attributes.qualifier : null,
        };

        results.push(_.extend({},currentTimeFrame, {value: weather_condition}));
        timeFrameCounter++;
      }

      i++;
    }

    return results;
  }

};

module.exports = parameterParser;