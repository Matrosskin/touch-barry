const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const path = require('path');
const tsconfig = require('./tsconfig.json')

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // NOTE: To prevent using of dependencies from back node_modules we need to left only front node_modules.
      // Otherwise we will have two copies of @reduxjs/toolkit.
      if (webpackConfig.resolve.modules.length !== 2 || webpackConfig.resolve.modules[0] !== 'node_modules') {
        throw new Error('Looks like webpack paths to resolve imports changed.')
      }
      webpackConfig.resolve.modules = [webpackConfig.resolve.modules[1]]

      webpackConfig.module.rules[1].oneOf[3].include = [
        webpackConfig.module.rules[1].oneOf[3].include,
        path.resolve(__dirname, '..', 'back', 'shared')
      ]

      const tsPaths = tsconfig.compilerOptions.paths
      Object.keys(tsPaths).forEach((alias) => {
        webpackConfig.resolve.alias[alias.replace('/*', '')] = tsPaths[alias].map((p) => path.resolve(__dirname, p.replace('/*', '')))
      })

      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

      return webpackConfig;
    },
  },
};
