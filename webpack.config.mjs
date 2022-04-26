// Generated using webpack-cli https://github.com/webpack/webpack-cli

import autoprefixer from "autoprefixer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path, { dirname } from "path";
import PostCSSpresetEnv from "postcss-preset-env";
import { fileURLToPath } from "url";

const isProduction = process.env.NODE_ENV === "production";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/components/wizard.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
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
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
