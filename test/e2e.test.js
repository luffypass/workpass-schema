const _ = require("lodash");
const testDocuments = require("./fixtures/testDocuments");
const wpSchema = require("../dist/workpass-schema");

describe("E2E Test", () => {
  let document;
  let documents;

  it("can issue one document", () => {
    const data = testDocuments[0];
    document = wpSchema.issueDocument(data);
    expect(document.schema).to.exist;
    expect(document.data).to.exist;
    expect(document.privacy).to.exist;
    expect(document.signature).to.exist;
  });

  it("can issue multiple documents", () => {
    const data = testDocuments;
    documents = wpSchema.issueDocuments(data);

    expect(documents.length).to.be.equal(testDocuments.length);
    documents.forEach(c => {
      expect(c.schema).to.exist;
      expect(c.data).to.exist;
      expect(c.privacy).to.exist;
      expect(c.signature).to.exist;
    });
  });

  it("can get data from the document document", () => {
    const data = wpSchema.getData(document);
    expect(data).to.deep.equal(testDocuments[0]);
  });

  it("can validate schema of documents", () => {
    const isValid = wpSchema.validateSchema(document);
    expect(isValid).to.be.true;

    documents.forEach(c => {
      expect(wpSchema.validateSchema(c)).to.be.true;
    });
  });

  it("can detect invalidate schema", () => {
    const documentInvalid = _.cloneDeep(document);
    documentInvalid.data["some-invalid-key"] = "invalid value";
    const isValid = wpSchema.validateSchema(documentInvalid);
    expect(isValid).to.be.false;
  });

  it("can obfuscate fields (repeatedly)", () => {
    const obfuscatedCert = wpSchema.obfuscateFields(document, [
      "recipient.dob",
      "recipient.fin"
    ]);
    expect(obfuscatedCert).to.exist;
    expect(obfuscatedCert.privacy.obfuscatedData.length).to.be.equal(2);
    expect(obfuscatedCert.data.recipient.dob).to.not.exist;
    expect(obfuscatedCert.data.recipient.fin).to.not.exist;

    const moreObfuscation = wpSchema.obfuscateFields(
      obfuscatedCert,
      "pass.isMultipleJourney"
    );
    expect(moreObfuscation.privacy.obfuscatedData.length).to.be.equal(3);
    expect(moreObfuscation.data.isMultipleJourney).to.not.exist;

    const isValidStructure = wpSchema.validateSchema(moreObfuscation);
    expect(isValidStructure).to.be.true;

    const isValidSignature = wpSchema.verifySignature(moreObfuscation);
    expect(isValidSignature).to.be.true;
  });
});
