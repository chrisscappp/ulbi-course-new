import webpack from "webpack"
import HtmlWebpackPlugin from "html-webpack-plugin";
import { BuildOptions } from "./types/config";
import MiniCssExtractPlugin from "mini-css-extract-plugin"

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

export default function buildPlugins({paths, isDev}: BuildOptions): webpack.WebpackPluginInstance[] {
	return [
		new HtmlWebpackPlugin({
			template: paths.html // теперь будет браться шаблон этого файла
		}),
		new webpack.ProgressPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		}),
		new webpack.DefinePlugin({
			__IS_DEV__: JSON.stringify(isDev)
		}), // глобальная переменная
		isDev && new ReactRefreshWebpackPlugin()
	]
} // функция вернёт плагины для webpack