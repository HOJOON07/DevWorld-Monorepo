// @ts-ignore
const deps = require('./package.json').dependencies;

export const mfConfig = {
  name: 'auth',
  filename: 'remoteEntry.js',
  remotes: {},
  exposes: {
    './injector': './src/app/injector/injector.tsx',
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
    '@devworld/axios-client': {
      singleton: true,
    },
    '@devworld/tanstack-query-client': {
      singleton: true,
    },
    'react-hook-form': {
      singleton: true,
      eager: true,
      requiredVersion: deps['react-hook-form'],
      strictVersion: true,
    },
  },
};
