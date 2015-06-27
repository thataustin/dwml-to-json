var parse = require('xml-parser');
var _ = require('underscore');
var dwmlDataSubtreeParser = require('./dwml-data-subtree-parser');

var dwmlParser = {

  /**
   * Parses dwml into a JSON object that's easier to grok
   *
   * @param xmlString {String} - raw DWML document text
   * @return {Object}
   */
  parse: function (xmlString) {
    var documentAsJson = parse(xmlString);
    return this._getDwmlObjectsFromTree(documentAsJson);
  },

  _getDwmlObjectsFromTree: function (documentAsJson) {
    var root = documentAsJson && documentAsJson.root;

    var isValid = this._isValidDWMLTree(root);

    if (isValid !== true) {
      throw new Error(isValid);
    }

    var dwmlDataSubtree = _.findWhere(root.children, { name: 'data'});

    var results = {};
    _.extend(results, this._getDocumentData(dwmlDataSubtree));
    return results;
  },

  /**
   * @param dwmlDataSubtree {JSON}
   */
  _getDocumentData: function (dwmlDataSubtree) {
    return dwmlDataSubtreeParser.parse(dwmlDataSubtree);
  },

  /**
   * @param root {JSON}
   */
  _isValidDWMLTree: function (root) {
    if (!root) {
      return 'Cannot find document root';
    }

    if (root.name !== 'dwml') {
      return 'Root element is supposed to be named "dwml"';
    }

    if (! root.children ) {
      return 'Cannot find DWML data [ie, the children element of the dwml tree]';
    }

    return true;
  }
};

module.exports = dwmlParser;