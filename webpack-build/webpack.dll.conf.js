const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry: {
        vue: ['vue/dist/vue.esm.js', 'vue-router', 'vuex', 'axios'],
        ui: ['mint-ui'],
        vendor: ['vue-i18n', 'crypto-js']
    },
    output: {
        path: path.join(__dirname, '../dll'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    devtool: '#source-map',
    mode: 'production',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                parallel: true,
                sourceMap: true,
                cache: true
            })
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dll', '[name]-manifest.json'),
            name: '[name]'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]
}