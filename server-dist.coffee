express = require("express")
compression = require('compression')

app = express()

app.use(compression({
  threshold: 512
}))

app.configure ->
  app.use (req, res, next) ->
    if req.url == "/"
      # res.setHeader "content-security-policy", "img-src 'self' data:; style-src 'self' 'unsafe-inline'; frame-src 'self' https://*.youtube.com;; script-src 'self'; connect-src 'self' *.blockchain.info wss://*.blockchain.info https://blockchain.info https://api.sharedcoin.com; object-src 'none'; media-src 'self' data: mediastream:; font-src 'none';"
    next()

  app.use(express.static(__dirname + '/dist'));
  
  app.use express.errorHandler(
    dumpExceptions: true
    showStack: true
  )
  return

app.listen 8080, ->
  console.log "Listening on 8080"
  return