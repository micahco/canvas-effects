const path = require('path');

module.exports = {
	entry: './example/index.ts',
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
		filename: 'bundle.min.js',
		publicPath: '/',
		path: __dirname
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'example'),
		},
		compress: true,
		port: 9000
	}
};