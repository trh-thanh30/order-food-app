module.exports = {
  root: true,
  extends: [@react-native/eslint-config, prettier],
  plugins: [simple-import-sort],
  env: {
    jest: true
  },
  rules: {
    react-hooks/rules-of-hooks: error,
    react-hooks/exhaustive-deps: warn,
    simple-import-sort/imports: warn,
    simple-import-sort/exports: warn
  },
  settings: {
    import/resolver: {
      alias: {
        map: [[@, ./src]],
        extensions: [.ts, .tsx, .js, .jsx, .json]
      }
    }
  }
};
