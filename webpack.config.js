const path = require('path');
//var webpack = require('webpack');


var VENDOR_PATH = __dirname + '/node_modules';

var PROD = 1;

var config = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {

        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),

    },
    devServer: {
        inline: true,
        port: 8080
    },
    externals: {
        "jquery": "$",
        'react': 'React',
        'react-dom': 'ReactDOM',
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ],
    },
}

// config.addExternal('jquery', '$');
// config.addExternal('react', 'React');
// config.addExternal('react-dom', 'ReactDOM');

// config.addVendor('react-router', VENDOR_PATH + '/react-router/umd/ReactRouter.js')
// config.addVendor('react-bootstrap', VENDOR_PATH + '/react-bootstrap/dist/react-bootstrap.js');
//config.addVendor('react-router-bootstrap', VENDOR_PATH + '/react-router-bootstrap/lib/index.js');

//config.addPlugin(new CommonsChunkPlugin('vendors', 'vendors.js'));
//config.addPlugin(new CommonsChunkPlugin({ name: 'vendors', filename: 'vendors.bundle.js' }));


module.exports = config;