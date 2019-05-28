/* eslint-disable */
const schema = require("./schema.json");
let {
  issueDocument,
  addSchema,
  validateSchema
} = require("@govtechsg/open-attestation");

describe("schema/v1.0", () => {
  beforeEach(() => {
    addSchema(schema);
  });

  afterEach(() => {
    delete require.cache[require.resolve("@govtechsg/open-attestation")];
    let {
      issueDocument,
      addSchema,
      validateSchema
    } = require("@govtechsg/open-attestation");
  });

  it("is valid with missing data", () => {
    const data = {};
    const signing = () => issueDocument(data, schema);
    expect(signing).to.not.throw("Invalid document");
  });

  it("is not valid with additional data", () => {
    const data = require("./example.json");
    const dataWInvalidKey = {
      ...data,
      invalidKey: "value"
    };
    const signing = () => issueDocument(dataWInvalidKey, schema);
    expect(signing).to.throw("Invalid document");
  });

  it("validates the example document", () => {
    const data = require("./example.json");
    const signedDocument = issueDocument(data, schema);
    const valid = validateSchema(signedDocument);
    assert(valid);
  });
});
