module.exports = {
    root: true,
    extends: [
      // use the recommended rule set for both plain javascript and vue
      "eslint:recommended",
      "plugin:vue/recommended"
    ],
    rules: {
      "linebreak-style":0,
      "vue/no-parsing-error": [2, { 'x-invalid-end-tag': false }]
    }
  };