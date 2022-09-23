const path = require('path');

module.exports = {
	entry: './page/index.ts',
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		publicPath: '/',
		path: path.join(__dirname, 'page'),
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'page'),
		},
		compress: true,
		port: 9000
	}
};