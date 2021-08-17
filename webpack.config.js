module.exports = {
    entry: "./src/index.js",
    output: {
      path: __dirname + "/build",
      filename: "bundle.js",
    },
    module:{
        rules:[
            {
              test: /\.css$/i,
              use:[
                  {loader: 'style-loader'},
                  {loader: 'css-loader'},
              ]
  
            }
          
        ]
    }
  };
  