// @ts-ignore
const deps = require('./package.json').dependencies;

export const mfConfig = {
  name: 'workspace',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './injector': './src/app/injector/injector.tsx',
  },
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
    '@devworld/axios-client': {
      singleton: true,
    },
    '@devworld/tanstack-query-client': {
      singleton: true,
    },
    '@devworld/editor': {
      singleton: true,
    },
  },
};
