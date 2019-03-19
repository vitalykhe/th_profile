const fs = require('fs');

function mergeValues (values, content) {
  //Cycle over keys and replace key by a value
  for (let key in values) {
    content = content.replace("{{" + key + "}}", values[key]);
    //console.log(key, values[key]);
  }
  return content;
}

function view (template, values, response) {
  //read vie file
  let fileContents = fs.readFileSync('./views/' + template + '.html', 'utf8');

  //insert values in to the content
  fileContents = mergeValues(values, fileContents);

  //Write content
  response.write(fileContents);
}


module.exports.view = view;
