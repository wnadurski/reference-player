const path = require("path")

module.exports = {
    entry: path.join(__dirname, "static", "index.js"),
    output: {
        filename: 'bundle.js',
        sourceMapFilename: "bundle.js.map"
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, "static"),
        port: 9000,
        proxy: {
            "/api.aspx": {
                target: "https://m7be2st2.solocoo.tv/m7be2st2iphone",
                secure: false,
                changeOrigin: true
            }
        }
    }
}