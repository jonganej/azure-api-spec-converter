#!/usr/bin/env node

const fs = require('fs');

if (process.argv.length <= 2)
  throw new Error('Path to Swagger API 2.0 specs file required.');

const specsFile = process.argv[2];
fs.readFile(specsFile, (err, data) => {
  const jsonFile = JSON.parse(data);
  Object.keys(jsonFile.paths).forEach(pathName => {
    if (
      Object.prototype.hasOwnProperty.call(jsonFile.paths[pathName], 'post')
    ) {
      const operation = jsonFile.paths[pathName].post;
      if (Object.prototype.hasOwnProperty.call(operation, 'parameters')) {
        operation.parameters.forEach(param => {
          if (param.in === 'body') {
            param.name = `${operation.operationId}-body`;
          }
        });
      }
    }
  });
  fs.writeFile(specsFile, JSON.stringify(jsonFile, null, 2), 'utf-8', err => {
    if (err) {
      throw new Error(err);
    }
    console.log('The file was saved!');
  });
});
