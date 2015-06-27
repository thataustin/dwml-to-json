var _ = require('underscore');

var locationParser = {

  /**
   * @param locationDataSet {JSON} - essentially a <location> tag in a DWML tree, represented as JSON
   * @return {{key: *, point: *}}
   */
  parse: function (locationDataSet) {

    if (!locationDataSet.children) {
      throw new Error('Invalid location in dwml: ' + JSON.stringify(locationDataSet));
    }

    var locationAttributes = locationDataSet.children;

    var results = {};
    var key = this._getLocationKey(locationAttributes);
    results[key] = this._getLocationPoint(locationAttributes);
    return results;
  },

  _getLocationKey: function (locationAttributes) {
    var keyObj = _.findWhere(locationAttributes, { name: 'location-key' });
    if (! (keyObj && keyObj.content )) {
      throw new Error('Location is missing key: ' + JSON.stringify(locationAttributes));
    }

    return keyObj.content;
  },

  _getLocationPoint: function (locationAttributes) {
    var pointObj = _.findWhere(locationAttributes, { name: 'point' });
    if (! (pointObj && pointObj.attributes )) {
      throw new Error('Location is missing point: ' + JSON.stringify(locationAttributes));
    }
    return pointObj.attributes;
  }

};

module.exports = locationParser;