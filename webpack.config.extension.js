const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEST_DIR = process.env.DEST_DIR || 'build';

const config = {
    module: {
        rules: [
            {
                // Only run `.js` and `.jsx` files through Babel
                test: /\.jsx?$/,
        
                // Skip any files outside of your project's `src` directory
                include: [
                    path.resolve(__dirname, 'src'),
                ],
        
                // Skip any files in public path
                exclude: [
                    path.resolve(__dirname, 'src', 'public'),
                ],
        
                sideEffects: false,
        
                loader: 'babel-loader',
                options: JSON.parse(`${fs.readFileSync(path.resolve('.babelrc.web'))}`),
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.woff2$/i,
                use: ['file-loader'],
            },
        ],
    },
    resolve: {
        alias: {
            lodash: path.resolve(__dirname, 'node_modules/lodash'),
            'popper.js': path.resolve(__dirname, 'node_modules/popper.js'),
        },
        modules: [
            'node_modules',
        ],
        extensions: ['.js', '.jsx'],
    },
    //entry: {
    //    webapp: './src/webapp/webapp.js',
    //},
    devtool: (NODE_ENV === 'production' ? false : 'cheap-module-source-map'),
    mode: (NODE_ENV === 'production' ? 'production' : 'development'),
    target: 'electron-renderer',
    devServer: {
        historyApiFallback: {
            disableDotRule: true,
        },
    },
    
    output: {
        path: path.resolve(__dirname, DEST_DIR),
        filename: `[name].js`,
        chunkFilename: `[name].chunk.[chunkhash].js`,
        publicPath: '',
    },
    externals: [],
    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                HYPERKEYS_DEV_ENV: process.env.HYPERKEYS_DEV_ENV,
                BROWSER: true,
                HYPERKEYS_API_DOMAIN: process.env.HYPERKEYS_API_DOMAIN ? `"${process.env.HYPERKEYS_API_DOMAIN}"` : undefined,
                HYPERKEYS_ENABLE_MOCKS: process.env.HYPERKEYS_ENABLE_MOCKS,
                NODE_ENV: `"${NODE_ENV}"`,
            },
            //FIXME this disables entirely the React Devtool, cannot stay like this
            //'__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
        }),
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/,
        }),
    ],
    
    watchOptions: {
        aggregateTimeout: 1000,
    },
};

if (NODE_ENV === 'production') {
    config.optimization = config.optimization || {};
    config.optimization.minimize = true;
    config.optimization.usedExports = true;
    
    config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'stats2.html',
        defaultSizes: 'parsed',
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: 'stats.json',
        statsOptions: { source: false },
        logLevel: 'info',
    }));
}

module.exports = [
    config,
];
