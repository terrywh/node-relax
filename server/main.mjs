import http from 'http'
import * as util from "./util.mjs"

(async function() {
    const config = {
        entryFiles: ["calendar/source/main.js"],
        serverPath: "",
        listenPort: 8080,
    }
    util.build(config.entryFiles)

    http.createServer({
        headersTimeout: 6000,
        keepAliveTimeout: 60000,
    }, (req, rsp) => {
        const url = new URL(req.headers.host ? "http://" + req.headers.host + req.url : "http://127.0.0.1:" + config.listenPort + req.url)
        util.serveFile(req, rsp, config.serverPath + url.pathname)
    }).listen(config.listenPort)
})()
