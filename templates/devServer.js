var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')

var host = process.env.host || 'localhost'
var port = process.env.port || 9090

var app = express()

var compiler = webpack(config, (err, stats) => {
  var json = stats.toJson()

  if(json.errors.length) {
    console.log(json.errors[0])
  }
})

app.use(require('webpack-hot-middleware')(compiler))

app.use(require('webpack-dev-middleware')(compiler, {
  headers: {'access-control-allow-origin': '*'},
  publicpath: config.output.publicpath,
  contentbase: 'app',
  historyapifallback: true,
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

app.use(function (req, res, next) {
  if (req.url.match(/^(\/[a-zA-Z-]+)+(.html)?(\?.+)?$/)) {
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
