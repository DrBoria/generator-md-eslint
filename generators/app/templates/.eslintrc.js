module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:promise/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      "babel-module": {},
      typescript: {}
    },
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    react: {
      version: "detect"
    }
  },
  ignorePatterns: ["src/models/*", "amplify/*", "src/ui-components/*"],
  rules: {
    // React features
    "react/react-in-jsx-scope": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/no-array-index-key": 0,

    // Declarations
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: true, classes: true, variables: true }
    ],
    "no-underscore-dangle": "error",
    "no-var": "error",
    "prefer-const": ["error"],

    <% if(answers.strictNames){ %>
      <%- include('ruleGroups/strictNames.js'); %>
    <% } %>
    
    // Spaces & Delimeters
    "@typescript-eslint/semi": ["error", "always"],
    "@typescript-eslint/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        }
      }
    ],
    "no-tabs": "error",

    <% if(answers.importsOrder){ %>
      <%- include('ruleGroups/importOrder.js'); %>
    <% } %>

    // Other
    eqeqeq: ["error", "smart"],
    "no-eval": "error",
    "no-unsafe-finally": "error",
    complexity: ["error", 6],
    "unicorn/no-new-array": 0
  }
};
