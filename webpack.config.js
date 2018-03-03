const path = require("path");
const webpack =  require("webpack");
const HtmlWebpackPlugin =  require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const paths = require("./config/paths");
const serverPath = "http://swapi.co/"; 

module.exports = {
	devtool : 'inline-source-map',
	entry :"./app/index.js",
	output : {
		path: path.join(__dirname, 'build'),
    	filename: 'bundle.js'
	},
	module : {
		rules : [
			{
	           test: /\.js$/,
	           loader: 'babel-loader',
	           include : path.join(__dirname, 'app'),
	           exclude: /node_modules/
	        },
	        {
	        	test: /\.(js[x]*)$/,
	        	loader : "babel-loader",
	        	include : path.join(__dirname, 'app'),
        		exclude: /node_modules/
	        },
	      	{
	        	test: /\.css/,
	        	loader: ExtractTextPlugin.extract("css-loader")
	      	}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx' , '.css'],
		alias: {
	      Components: path.resolve(paths.appSrc, "components/"),
	      Containers: path.resolve(paths.appSrc, "containers/"),
	      Styles: path.resolve(paths.appSrc, "styles/")
	    }
	},

	devServer : {
	    proxy: {
	      "/api/**": {
	        target: serverPath,
	        changeOrigin: true,
	        secure: false
	      }
	    }
	},
	plugins : [
		new ExtractTextPlugin("bundel.css"),
		new HtmlWebpackPlugin({
			template : './app/public/index.html',
			filename : "index.html",
			inject : "body"
		})
	]
};