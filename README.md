# Azure API Spec Converter

Converts a general Swagger 2.0 API Specification to an Azure-compliant API specification.

Due to a [known issue](https://docs.microsoft.com/en-us/azure/api-management/api-management-api-import-restrictions) with Azure API Management in importing Swagger 2.0 API specifications, this converter CLI ensures that parameter names, especially that of the request body, are unique across both path and query.

## Usage

`azure-api-spec-converter /path/to/json/file`
