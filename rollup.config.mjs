import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      // Replace 'src/' with 'public/' and add '.min' before the file extension
      file: 'dist/validator.min.js',
      name: 'SiriusValidation',
      format: 'umd' // or 'esm' or 'cjs', depending on your needs
    },
    plugins: [terser()]
  },
  {
    input: 'src/index.js',
    output: {
      // Replace 'src/' with 'public/' and add '.min' before the file extension
      file: 'dist/validator.js',
      name: 'SiriusValidation',
      format: 'umd' // or 'esm' or 'cjs', depending on your needs
    }
  }
]
