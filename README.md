# Workpass Schema v1.1
This library supplies the schemas used for workpass 2.0, in the form of [json schemas](http://json-schema.org)

## Installation

Using npm:

```bash
npm install @govtechsg/workpass-schema
```

## Usage

If you are writing a **document issuer**: you probably want to [issue a document](#issuing-a-document) or [issue multiple documents](#issue-multiple-documents)

If you are writing a **document verifier or viewer**: you probably want to
- [Workpass Schema v1.1](#workpass-schema-v11)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Using OpenCerts](#using-opencerts)
    - [Validate Schema](#validate-schema)
    - [Verifying Document Signature](#verifying-document-signature)
    - [Issue a Document](#issue-a-document)
    - [Issue Multiple Documents](#issue-multiple-documents)
    - [Retrieving Document contents](#retrieving-document-contents)
    - [Obfuscating Fields in a Document](#obfuscating-fields-in-a-document)
  - [Developers](#developers)
    - [Test](#test)
    - [Build](#build)
    - [Related Projects](#related-projects)

### Using OpenCerts
```javascript
const openDocument = require("@govtechsg/workpass-schema")

const exampleDocument = require("example.json") // reading an example document file
openDocument.verify(exampleDocument)
```

### Validate Schema

This library comes with the schemas in the `./schema` folder, all of them are loaded as valid schemas upon initialization.

```javascript
openDocument.validateSchema(exampleDocument)
```
### Verifying Document Signature

Documents are considered untampered-with if they have a valid signature field. Refer to the [Open Attestation](https://github.com/GovTechSG/open-attestation) library for more details on this.

```javascript
openDocument.verifySignature(exampleDocument)
```

### Issue a Document

A single Document can be issued using the `.issueDocument(document)` method.
Issuing a document in this manner will append a signature field to the document.

The return value of the method will be the signed document.

```javascript
const issuedCert = openDocument.issueDocument(exampleDocument)
```
### Issue Multiple Documents

Multiple Documents can be issued at once with the `.issueDocuments(document[])` method.

The return value of the method will be an array of signed documents.

```javascript
const exampleDocuments = [cert1, cert2, cert3, ...]
const issuedCerts = openDocument.issueDocuments(exampleDocuments)
```
### Retrieving Document contents

The raw document has salt in the fields to prevent enumeration, we provide a convenience method to retrieve the unsalted contents of the document using the method `.documentData(document)`

```javascript
const data = openDocument.documentData(exampleDocument)
```

### Obfuscating Fields in a Document
To obfuscate fields in a cert, the method `.obfuscateFields(document, paths[])` is provided.
The paths[] parameter is simply the JSON path for the fields to be obfuscated.

The method returns the obfuscated document.

```javascript
const obfuscatedCert = openDocument.obfuscateFields(exampleDocument, [
    "recipient.fin",
    "recipient.occupation"
]);
```

## Developers

The code is written to ES6 specs with stage-3 presets and is compiled by Babel.


### Test

```bash
npm run test
```
### Build

```bash
npm run build
```

### Related Projects
[Open Attestation](https://github.com/GovTechSG/open-attestation)
[Document Contract](https://github.com/OpenCerts/certificate-store-contract)
[OpenCert Web UI](https://github.com/GovTechSG/certificate-web-ui)
