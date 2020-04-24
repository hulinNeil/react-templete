const paths = require('./paths');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');

const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
const sockPort = process.env.WDS_SOCKET_PORT;

module.exports = {
  hot: true,
  transportMode: 'ws',
  injectClient: false,
  sockHost,
  sockPath,
  sockPort,
  historyApiFallback: true,
  contentBase: paths.appBuild,
  progress: true,
  compress: true,
  quiet: true,
  proxy: {
    "/api": {
      target: "http://localhost:3100/",
      secure: true,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api"
      }
    }
  },
  before(app, server) {
    // If an error occurs, you can jump to the wrong location.
    app.use(errorOverlayMiddleware());
  }
}