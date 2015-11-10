import webpack from 'webpack';
import yargs from 'yargs';

export const options = yargs
  .alias('p', 'optimize-minimize')
  .alias('d', 'debug')
  .option('port', {
    default: '8080',
    type: 'string'
  })
  .argv;

export const jsLoader = 'babel?cacheDirectory';

const baseConfig = {
  entry: undefined,

  output: undefined,

  externals: undefined,

  module: {
    loaders: [
        { test: /\.jsx?/, loader: jsLoader, exclude: /node_modules/ },
        {
            test: /\.css$/,
            loader: "style?sourceMap!css"
        },
        // LESS
        {
            test: /\.less$/,
            loader: 'style?sourceMap!css?sourceMap!less?sourceMap'
        },
        {
            // test: /\.(gif|png|woff|eot|woff2|ttf|svg)$/,
            test: /\.(gif|png)$/,
            loader: 'url-loader?limit=400000'
        },

        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=400000&minetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=400000" }


        
    ]
  },

    resolve: {
        modulesDirectories: ['node_modules', './src'],
        extensions: ['', '.jsx', '.js']
        
    },       

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(options.optimizeMinimize ? 'production' : 'development')
      }
    })
  ]
};

if (options.optimizeMinimize) {
  baseConfig.devtool = 'source-map';
}

export default baseConfig;
