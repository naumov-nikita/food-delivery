'use strict'

const path = require('path');

module.exports = {
  mode: "development", 

  entry: "./js/index.js", 

  output: {
		filename: "main.js", 
		path: __dirname + '/dist/js'
	},

	watch: true,
    
	devtool: 'source-map',
	module: {}
};
