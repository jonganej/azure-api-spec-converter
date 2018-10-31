#!/usr/bin/env node

const fs = require('fs');

if (process.argv.length <= 2)
  throw new Error('Path to Swagger API 2.0 specs file required.');

const specsFile = process.argv[2];
fs.readFile(specsFile, (err, data) => {
  const jsonFile = JSON.parse(data);
  Object.getOwnPropertyNames(jsonFile.paths).forEach(pathName => {
    const operations = jsonFile.paths[pathName];
    Object.getOwnPropertyNames(operations).forEach(methodName => {
      const operation = operations[methodName];
      console.log(operation);
      if (Object.prototype.hasOwnProperty.call(operation, 'parameters')) {
        operation.parameters.forEach(param => {
          if (param.in === 'body') {
            param.name = `${operation.operationId}-body`;
          }
        });
      }
    });
  });
  fs.writeFile(specsFile, JSON.stringify(jsonFile, null, 2), 'utf-8', err => {
    if (err) {
      throw new Error(err);
    }
    console.log(
      'The API specification file was successfully converted and saved!'
    );
  });
});
