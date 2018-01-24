const qrimage = require("qr-image");
const engine = require("./engine");

class QRImage extends engine.Engine {
    async init() {}

    async destroy() {}

    async render(req, res, next) {
        const text = req.query.text || "hello world";
        const format = req.query.format || "PNG";
        const margin = parseInt(req.query.margin || 0);
        var code = qrimage.image(text, {
            type: format,
            margin: margin
        });
        res.type(format);
        await new Promise(function(resolve, reject) {
            const stream = code.pipe(res);
            stream.on("finish", resolve);
        });
    }
}

module.exports = {
    QRImage: QRImage
};