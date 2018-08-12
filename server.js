var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var app = new (require('express'))()
var port = 3001
var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(function(req, res, next) {
      var allowedOrigins = '*';
      var origin = req.headers.origin;
      if(allowedOrigins.indexOf(origin) > -1){
           res.setHeader('Access-Control-Allow-Origin', origin);
      }
      //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.header('Access-Control-Allow-Credentials', true);
      return next();
    });
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
})
app.listen(process.env.PORT||port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
})
