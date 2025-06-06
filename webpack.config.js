// Updated to modern ESM format with 2025 standards

import autoprefixer from 'autoprefixer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import { fileURLToPath } from 'url';
import PostCSSpresetEnv from 'postcss-preset-env';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import NodeExternals from 'webpack-node-externals';
import { createRequire } from 'module';
import CopyPlugin from 'copy-webpack-plugin';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import browserslistToEsbuild from 'browserslist-to-esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const { BannerPlugin, DefinePlugin } = webpack;

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  devtool: isProduction ? "source-map" : "eval-cheap-module-source-map",
  target: "browserslist",
  cache: {
    type: "filesystem",
    buildDependencies: { config: [import.meta.url] },
    compression: 'gzip',
  },
  experiments: { 
    topLevelAwait: true,
    outputModule: true,
    lazyCompilation: !isProduction,
  },
  // Dev server configuration for development mode
  devServer: {
    hot: true,
    open: true,
    port: 3000,
    static: {
      directory: path.join(new URL('.', import.meta.url).pathname, 'dist'),
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    compress: true,
  },
  entry: "./src/react-wizardry.ts",
  externals: [
    NodeExternals({
      allowlist: ["nanoid", "classnames", "use-debounce"],
    }),
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: "swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: !isProduction,
                    refresh: !isProduction
                  }
                },
                target: "es2022"
              }
            }
          }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          stylesHandler,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [autoprefixer(), PostCSSpresetEnv()],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  optimization: {
    minimize: isProduction,
    moduleIds: "deterministic",
    chunkIds: "deterministic",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
  output: {
    clean: true,
    filename: pkg.name + ".js",
    assetModuleFilename: "assets/[hash][ext][query]",
    library: {
      name: pkg.name,
      type: "umd",
    },
    iife: true,
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: pkg.name + ".css",
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "README.md",
          to: "README.md",
        },
      ],
    }),
    new BannerPlugin({
      banner: `${pkg.name} v${pkg.version} | ${pkg.license} | ${pkg.homepage} | ${pkg.author}`,
    }),
    new DotenvPlugin({
      systemvars: true,
    }),
    isProduction && new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    fallback: { fs: false, path: false, os: false },
  },
};

export default (env) => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  
  // Only include BundleAnalyzerPlugin when analyze flag is passed
  if (env && env.analyze) {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "server",
        openAnalyzer: true,
      })
    );
  }
  
  return config;
};
