const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/server'),
    filename: '[name].js',
  },
  entry: {
    main: './src/main.ts',
    'scripts/populate-test-data': './src/scripts/populate-test-data.ts'
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: ['./src/assets'],
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true,
    }),
  ],
  // Vendure uses dynamic requires for some files, so we need to keep them as require()
  // rather than converting to ESM imports
  ignoreWarnings: [/Critical dependency: the request of a dependency is an expression/],
};
