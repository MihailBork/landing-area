const withSass = require('@zeit/next-sass');
const path = require(`path`);

module.exports = withSass({
  webpack(config, { dev }) {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: `pre`,
        exclude: /node_modules/,
        loader: `eslint-loader`,
        options: {
          // Emit errors as warnings for dev to not break webpack build.
          // Eslint errors are shown in console for dev, yay :-)
          emitWarning: dev,
        },
      })
    }

    config.resolve.modules.push(path.resolve('./'))
    return config
  }
});
