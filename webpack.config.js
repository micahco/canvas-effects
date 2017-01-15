const webpack = require('webpack');

module.exports = {
	entry: './dev/index.js',
	output: {
		filename: 'bundle.min.js',
		publicPath: '/',
		path: __dirname
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true,
			compress: {
        		warnings: false
    		}
		})
	],
	devServer: {
		colors: true,
		inline: true,
		port: 8080,
		historyApiFallback: {
			index: 'dev/index.html'
		}
	}
}
