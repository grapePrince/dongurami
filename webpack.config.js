let path = require("path");
 
 module.exports = {
    mode: 'development',
    entry: {
        'app.js' : [ 
            '@babel/polyfill',    // multiple entry 로 babel polyfill 을 넣는다.
            './src/js/app.js'
        ]
    },
    output: {
        filename: '[name]',
        path: path.resolve(__dirname, 'src/js')
    },
    devtool: 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|lib)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env', 
                  { 
                    'targets': { 
                      'browsers': ['last 3 versions', '>= 1% in KR']
                    } 
                  }
                ]  
              ]              
            }
          }
        }
      ]
    }
  };


/*

@babel/polyfill  을 앞에 붙여줘야 런타임에서 es6문법 사용 가능
inline-source-map 을 사용해야 디버깅 할 때 원래 소스를 찾아갈 수 있음. 

webpack 에서는 왠만하면 less 컴파일은 시도하지 않는다. 
경로를 찾아가야하는 부분에서 loader들을 여러개 타면서 위치가 꼬여서 resolve 불가능해진다. 
https://github.com/webpack-contrib/less-loader/issues/76

preset 줄 때 옵션을 쓰려면 배열로 묶어야 한다. 주의. 

*/

