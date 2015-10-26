var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')

var host = process.env.HOST || 'localhost'
var port = process.env.PORT || 9090

var app = express()

var compiler = webpack(config)

app.use(require('webpack-hot-middleware')(compiler))

var devMiddleware = app.use(require('webpack-dev-middleware')(compiler, {
  headers: {'access-control-allow-origin': '*'},
  publicpath: config.output.publicpath,
  contentbase: 'app',
  hot: true,
  inline: false,
  stats: {
    colors: true,
    modules: false,
    timings: true,
    chuncks: false,
    chunkModules: false
  }
}))

/*Temp Hack to support react-router's history api
 * https://github.com/webpack/webpack-dev-middleware/issues/39
 */
app.use(function (req, res, next) {
  if (req.url.match(/^(\/[a-zA-Z-]+).*/)) {
    devMiddleware(
      {
        url: '/index.html'
      },
      res,
      next
    )
  } else {
    next()
  }
})


app.listen(port, host, (err) => {
  if(err) {
    console.log(err)
  }

  console.info('==> 🚧  webpack development server listening on %s:%s', host, port)
})
