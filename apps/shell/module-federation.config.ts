// @ts-ignore
const deps = require('./package.json').dependencies;

export const mfConfig = {
  name: 'shell',
  filename: 'remoteEntry.js',
  remotes: {
    // importRemote already handles the remote entry file name
    // so we can remove the remoteEntry.js from the URL
    // feed: "feed@http://localhost:3001/remoteEntry.js",
  },
  exposes: {},
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
    '@devworld/tailwind-config': {
      singleton: true,
    },
  },
};
