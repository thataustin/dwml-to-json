var _ = require('underscore');

var timeLayoutParser = {

  /**
   * @param timeLayoutDataSet {JSON} - just console.log it to see what it looks like
   */
  parse: function (timeLayoutDataSet) {

    if (!timeLayoutDataSet.children) {
      throw new Error('Missing children attribute of time layout tag: ' + JSON.stringify(timeLayoutDataSet));
    }

    var timeLayoutData = timeLayoutDataSet.children;

    var key = this._getKey(timeLayoutData);
    var results = {};
    results[key] = this._getTimeFrames(timeLayoutData);
    return results;
  },

  _getKey: function (timeLayoutData) {
    var keyObj = _.findWhere(timeLayoutData, { name: 'layout-key' });
    if (! (keyObj && keyObj.content )) {
      throw new Error('Time Layout is missing key: ' + JSON.stringify(timeLayoutData));
    }

    return keyObj.content;
  },

  /**
   * It's important that we loop through the start-valid-time and end-valid-time values in order.
   * That's the only way we know which start time belongs to which end time unless we want to
   * do a lot of time math.
   *
   * @param timeLayoutData {Object}
   * @private
   */
  _getTimeFrames: function (timeLayoutData) {
    var i = 0, timeframes = [], currentPair = {};

    while (i < timeLayoutData.length) {
      var currentLayoutTime = timeLayoutData[i] || {};

      if (currentLayoutTime.name === 'start-valid-time') {
        currentPair = { 'start-time': currentLayoutTime.content };
      }

      if (currentLayoutTime.name === 'end-valid-time') {
        currentPair['end-time'] = currentLayoutTime.content;
        timeframes.push(_.clone(currentPair));
        currentPair = {};
      }
      i++;
    }

    return timeframes;
  }

};

module.exports = timeLayoutParser;