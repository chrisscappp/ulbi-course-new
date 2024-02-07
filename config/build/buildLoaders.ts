import webpack from "webpack"
import MiniCssExtractPlugin, { loader } from "mini-css-extract-plugin"
import { BuildOptions } from "./types/config"

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

    const cssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, // создает стили из js (style-loader)
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(resPath.includes(".module.")),
                        localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]"
                    },
                }
            }, // переводит css к commonjs
            "sass-loader", // переводит sass к css
        ],
    }
	
    return [
        fileLoader,
        svgLoader,
        typescriptLoader,
        cssLoader,
    ] // порядок возврата лоудеров важен!
}