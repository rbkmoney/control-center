const webpack = require('webpack');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

module.exports = {
    plugins: [
        ...(process.env.SENTRY_AUTH_TOKEN
            ? [
                  new SentryWebpackPlugin({
                      authToken: process.env.SENTRY_AUTH_TOKEN,
                      org: 'rbkmoney-fd',
                      project: 'control-center',
                      include: './dist',
                      ignore: ['node_modules', 'webpack.config.js'],
                  }),
              ]
            : []),
    ],
};
