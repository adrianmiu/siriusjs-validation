import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.js',
    output: {
      // Replace 'src/' with 'public/' and add '.min' before the file extension
      file: 'dist/validator.min.js',
      format: 'esm' // or 'esm' or 'cjs', depending on your needs
    },
    plugins: [terser()]
  },
  {
    input: 'src/index.js',
    output: {
      // Replace 'src/' with 'public/' and add '.min' before the file extension
      file: 'dist/validator.js',
      format: 'esm' // or 'esm' or 'cjs', depending on your needs
    }
  }
]
