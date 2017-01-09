const webpack = require('webpack');

module.exports = {
	entry: './src/app.js',
	output: {
		filename: 'bundle.js',
		publicPath: '/build',
		path: __dirname + '/build'
	},
	module: {
		loaders: [
			{
				test: /\.html$/,
				loader: "raw-loader"
			},
			{
				test: /\.scss/,
				loader: "raw-loader"
			},
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
		historyApiFallback: true,
		port: 8080
	}
}
