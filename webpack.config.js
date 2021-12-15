const path = require('path');
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ewts.js',
	assetModuleFilename: '[name][ext]',
	clean: true,		// clean the dist folder before generating
    },

    module: {
    	rules: [
	    {
		test: /\.m?js$/,
		exclude: /node_modules/,
		use: {
		    loader: 'babel-loader',
		    options: {
			presets: [ '@babel/preset-env' ]
		    },
		},
	    },

	    // ewts.html file is copied straight to ./dist as an asset; src/index.js 'imports' it so it gets processed
	    {
	    	test: /\.html$/,
		type: 'asset/resource',
	    },
	],
    }
};

