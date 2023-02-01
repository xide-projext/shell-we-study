module.exports = {
    semi: false,
    singleQuote: true,
    trailingComma: 'es5',
    overrides: [
      {
        files: ['*.yaml', '*.yml'],
        options: {
          tabWidth: 4,
          printWidth: 88,
        },
      },
    ],
  }