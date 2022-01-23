var LOG_TYPES = {
    "INFO": "log",
    "WARNING": "warn",
    "ERROR": "error",
    "PROGRESS": "progress",
    "STATUS": "status"
}

if (typeof process !== "undefined") {

    if (typeof process.send !== "undefined") {

        process.on('uncaughtException', function(err) {
            console.log('Caught exception: ' + err, { type: LOG_TYPES.ERROR });
        });
        
        process.on('exit', function(code) {
            console.log("exit", { type: "exitCode", code: code})
        });
        
        console.log = function(message, data) {
            type = "log";
            if (data && data.type) {
                type = data.type;
            }
            switch(type) {
                case "progress":
                    process.send({ type: type, value: data.percentage });
                    break;
                case "exitCode":
                    process.send({ type: type, value: data.code });
                    break;
                default:
                    process.send({ type: type, value: message });
                    break;
            }
        }
    }
}