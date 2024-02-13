import webpack from "webpack"
import { BuildOptions } from "./types/config"
import { buildCssLoader } from "./loaders/buildCssLoader"

export default function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
	
	// уже умеет обрабатывать jsx. пишем на нативном js - добавляем babel-loader
	const typescriptLoader = {
		test: /\.tsx?$/, // фильтруем по этому регулярному выражению файлы, которые пропустим через лоудер
		use: 'ts-loader',
		exclude: /node_modules/,
	}

	const svgLoader = {
		test: /\.svg$/,
		use: ['@svgr/webpack'],
	}

	const fileLoader = {
		test: /\.(png|jpe?g|gif|woff2|woff)$/i,
		use: [
			{
				loader: 'file-loader',
			},
		],
	}

	const cssLoader = buildCssLoader(isDev)
	
	return [
		fileLoader,
		svgLoader,
		typescriptLoader,
		cssLoader,
	] // порядок возврата лоудеров важен!
}