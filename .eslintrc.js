module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/essential", "eslint:recommended"],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  rules: {
    "arrow-parens": ["error", "always"],
    "max-len": [
      "error",
      { ignoreTemplateLiterals: true, ignoreComments: true },
    ],
    "comma-dangle": [
      2,
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
