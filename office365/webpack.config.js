const path = require('path');
const webpack = require('webpack'); // Add this line
const JavaScriptObfuscator = require('webpack-obfuscator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');
// ... rest of the configuration
dotenv.config() // This loads your .env file and parses the variables

module.exports = {
  entry: './src/index.js', // Your entry point, from where Webpack starts bundling
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // The bundled file
    publicPath: '/',
  },

  plugins: [
    // ... other plugins



    
    new HtmlWebpackPlugin({
        template: 'public/index.html',
      }),

      new webpack.DefinePlugin({
        'process.env': JSON.stringify(process.env)
      }),

      new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css', // Customize the file naming pattern
      }),

      new CopyPlugin({
        patterns: [
          { from: 'public', to: '.', globOptions: { ignore: ["**/index.html"] } },          // You can specify more patterns here if needed
        ],
      }),

    // Add the JavaScriptObfuscator plugin
    new JavaScriptObfuscator({
      compact: true,
      controlFlowFlattening: false,
      deadCodeInjection: true,
      debugProtection: true,
      debugProtectionInterval: 0,
      disableConsoleOutput: true,
      identifierNamesGenerator: "hexadecimal",
      log: false,
      numbersToExpressions: true,
      renameGlobals: false,
      rotateStringArray: true,
      selfDefending: true,
      stringArray: true,
      stringArrayEncoding: [],
      stringArrayThreshold: 0.75,
      unicodeEscapeSequence: false
      // Add any additional options you want to use for obfuscation here.
      // These options are the same as what you would provide to javascript-obfuscator directly.
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile all .js and .jsx files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to use Babel for transpilation
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets for modern JavaScript and React
          }
        }
      },
      
      {
        test: /\.css$/, // Apply style-loader and css-loader for CSS files
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader', // Add this line
        ],
      
      
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash:8].[ext]'
        }
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // Automatically resolve these extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
  }
};

