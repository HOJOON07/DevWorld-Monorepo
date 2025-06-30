const deps = require('./package.json').dependencies;

export const mfConfig = {
  name: 'auth',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './injector': './src/injector.tsx',
  },
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps['react'],
    },
    'react-dom': {
      singleton: true,
      requiredVersion: deps['react-dom'],
    },
    '@devworld/ui': {
      singleton: true,
    },
    '@devworld/shell-router': {
      singleton: true,
    },
  },
};
