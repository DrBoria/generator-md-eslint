"@typescript-eslint/naming-convention": [
  "error",
  {
    selector: "variableLike",
    format: ["camelCase", "UPPER_CASE", "PascalCase"]
  },
  {
    selector: "variable",
    modifiers: ["destructured"],
    format: ["camelCase"]
  },
  {
    selector: "variable",
    modifiers: ["global"],
    format: ["camelCase", "PascalCase"]
  },
  // React Components should be in PascalCase
  {
    selector: "variable",
    modifiers: ["global"],
    types: ["function"],
    filter: {
      // you can expand this regex to add more allowed prefixes
      regex: "^(is|should|toggle|set|get|show|hide|fetch)",
      match: false
    },
    format: ["PascalCase"]
  },
  // Other functions should be in camelCase
  { selector: "function", modifiers: ["global"], format: ["camelCase"] },
  {
    selector: "typeAlias",
    prefix: ["T"],
    filter: {
      // you can expand this regex to add more allowed names
      regex: "^(Response|Error|Promise|P|T|Body)$",
      match: false
    },
    format: ["PascalCase"]
  },
  {
    selector: "enum",
    prefix: ["E"],
    filter: {
      // you can expand this regex to add more allowed names
      regex: "^(Response|Error|Promise|P|T|Body)$",
      match: false
    },
    format: ["PascalCase"]
  }
],
