 var path = require("path");
 
 module.exports = {
    entry: {
        '/src/js/app.js' : [ 
            '@babel/polyfill',    // multiple entry 로 babel polyfill 을 넣는다.
            './src/js/index.js'
        ],
        '/src/css/app.css' : './src/css/app.less'
    },
    output: {
        filename: '[name]',
        path: __dirname
    },

    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|lib|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
            test: /\.less$/,
            exclude: /(node_modules|lib|bower_components)/,
            loader: 'less-loader', // compiles Less to CSS
        }
      ]
    }
  };


/*

@babel/polyfill  을 앞에 붙여줘야 런타임에서 es6문법 사용 가능
inline-source-map 을 사용해야 디버깅 할 때 원래 소스를 찾아갈 수 있음. 

*/

