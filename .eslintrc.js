module.exports = {
  "root": true,
  "ignorePatterns": [
    "projects/**/*"
  ],
  "plugins": ["unused-imports", "simple-import-sort"],
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "overrides": [
    {
      "files": [
        "*.ts"
      ],
      "extends": [
        "airbnb-base",
        "airbnb-typescript/base",
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates"
      ],
      "rules": {
        // ESLint rules
        "import/prefer-default-export": "off",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",
        "max-len": [
          "error",
          120
        ],
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        // eslint-plugin-unused-imports rules
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
          "warn",
          { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
        ],
        // TypeScript Eslint rules
        "@typescript-eslint/indent": [
          "error",
          2
        ],
        "@typescript-eslint/comma-dangle": "off",
        "@typescript-eslint/lines-between-class-members": "off",
        "@typescript-eslint/quotes": ["error","single"],
        "@typescript-eslint/no-shadow": "error",
        "@typescript-eslint/no-explicit-any": 0,
        // Angular ESLint rules
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "no-console": [
          "warn",
          { "allow": ["error", "log"] }
        ],
      }
    },
    {
      "files": [
        "*.html"
      ],
      "extends": [
        "plugin:@angular-eslint/template/recommended"
      ]
    }
  ]
};
