# dwml-to-json
Pass in a DWML string, get back a JS object.

This is a fairly naive approach to making [DWML](http://graphical.weather.gov/xml/mdl/XML/Design/MDL_XML_Design.pdf) more approachable in JS.

### Installation

    npm install dwml-to-json
    
### Example usage

    var fs = require('fs');
    var parser = require('dwml-to-json');
    var xmlString = fs.readFileSync('path/to/dwml-file', 'utf8');
    var parsedData = dwmlParser.parse(xmlString);

### What does the JSON look like?
Look at the test file `test/visual-example.js` to see what the JSON looks like.
That JSON is based on the DWML found in `test/dwml.xml`

### Completeness
So far I've only tested `precipitation` and `probability-of-precipitation` as those were the only parameters I needed. 

But you should be able to include any location-based parameters in your DWML document and recieve them in the JSON response.
 
### Contributing
Please contribute.  There were no dwml parsers when I wrote this, so I'd love it if we could all get behind one in the npm community.

Obviously you can fork this, etc, but the better this tool gets the more we all profit.