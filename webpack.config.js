const path = require('path');
const devMode = process.env.NODE_ENV === 'development';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	context: path.resolve(__dirname, 'src'),
	entry: {
		polyfill: 'babel-polyfill',
		app: './js/app.js',
		style: './scss/style.scss'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer: {
		port: 9000,
		compress: true,
		contentBase: path.join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')
							]
						}
					},
					'sass-loader'
				],
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: './images',
							useRelativePath: true
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 65
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							},
							// Don't working in safari
							// webp: {
							// 	quality: 75
							// }
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [
					'file-loader'
				]
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin('./dist', {}),
		new MiniCssExtractPlugin({
			filename: devMode === 'development' ? '[name].css' : '[name].[hash].css',
			chunkFilename: devMode === 'development' ? '[id].css' : '[id].[hash].css'
		}),
		new HtmlWebpackPlugin({
			title: 'My App',
			filename: 'index.html',
			template: './index.html'
		}),
		new ScriptExtHtmlWebpackPlugin(),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		})
	]
};
