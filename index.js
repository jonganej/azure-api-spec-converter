#!/usr/bin/env node

const fs = require('fs');
const program = require('commander');

program
  .version('1.0.0')
  .description(
    'Converts a general Swagger 2.0 API Specification to an Azure-compliant API specification.'
  )
  .command(
    '<file>',
    'Convert given file to Azure-compliant Swagger specification.'
  )
  .action(file => {
    fs.readFile(file, (err, data) => {
      const jsonFile = JSON.parse(data);
      Object.getOwnPropertyNames(jsonFile.paths).forEach(pathName => {
        const operations = jsonFile.paths[pathName];
        Object.getOwnPropertyNames(operations).forEach(methodName => {
          const operation = operations[methodName];
          if (Object.prototype.hasOwnProperty.call(operation, 'parameters')) {
            operation.parameters.forEach(param => {
              if (param.in === 'body') {
                param.name = `${operation.operationId}-body`;
              }
            });
          }
        });
      });
      fs.writeFile(file, JSON.stringify(jsonFile, null, 2), 'utf-8', err => {
        if (err) {
          throw new Error(err);
        }
        console.log(
          'The API specification file was successfully converted and saved!'
        );
      });
    });
  });

program.parse(process.argv);
