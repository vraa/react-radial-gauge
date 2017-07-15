let path = require('path');
let DIR_NAME = __dirname;
module.exports = {
    entry: ['./src/gauge.js'],
    output: {
        path: path.join(DIR_NAME, 'dist'),
        filename: 'react-svg-gauge.js',
        publicPath: 'dist/js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }

        ]
    }
};