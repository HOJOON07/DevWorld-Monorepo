// @ts-ignore
const deps = require('./package.json').dependencies;

export const mfConfig = {
  name: 'feed',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './injector': './src/injector.tsx',
  },
  // Disable auto type generation in development to prevent infinite recompilation
  dts: process.env.NODE_ENV === 'production',
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
