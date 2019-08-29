const {
  getData,
  issueDocument: oaIssueDocument,
  issueDocuments: oaIssueDocuments,
  addSchema,
  verifySignature,
  validateSchema: oaValidateSchema,
  obfuscateDocument,
  MerkleTree
} = require("@govtechsg/open-attestation");

/* eslint-disable global-require */
// Disabling eslint for this because it doesn't make sense
const schemas = {
  "1.1": require("../schema/1.1/schema.json")
};
/* eslint-enable global-require */

const defaultSchema = schemas["1.1"];

// Start - Initialise all valid schema
addSchema(Object.values(schemas));
// End - Initialise all valid schema

const issueDocument = data => oaIssueDocument(data, defaultSchema);

const issueDocuments = dataArray => oaIssueDocuments(dataArray, defaultSchema);

const validateSchema = data => oaValidateSchema(data, defaultSchema);

const obfuscateFields = (document, fields) =>
  obfuscateDocument(document, fields);

module.exports = {
  issueDocument,
  issueDocuments,
  verifySignature,
  validateSchema,
  obfuscateFields,
  getData,
  schemas,
  defaultSchema,
  MerkleTree
};
