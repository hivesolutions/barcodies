// requires the multiple libraries
const express = require("express");
const process = require("process");
const util = require("hive-js-util");
const lib = require("./lib");

// builds the initial application object to be used
// by the application for serving
const app = express();

process.on("exit", () => {
    util.Logging.info("Exiting on user's request");
    lib.destroy();
});

app.get("/", (req, res, next) => {
    async function clojure() {
        lib.verifyKey(req);
        const engine = req.query.engine || "qrimage";
        var engineModule = lib.ENGINES[engine];
        var engineInstance = engineModule.singleton();
        await engineInstance.render(req, res, next);
    }
    clojure().catch(next);
});

app.listen(lib.PORT, lib.HOSTNAME, () => {
    util.Logging.info("Listening on " + lib.HOSTNAME + ":" + String(lib.PORT));
    lib.init();
});
