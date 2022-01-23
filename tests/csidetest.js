
function prom(process) {
    var logs = [];
    return new Promise(async (resolve) => {
        process.on("message", function(log) {
            logs.push(log);
         });
         process.on('disconnect', async function(code) {
             resolve(logs);
         });
    });
}

module("Forks");

asyncTest("cside-autotest", async function() {
    var autotest_process = cp.fork("autotest.js", ["mygame", "death"], {
    //   cwd: "/Users/carey/Documents/Work/Github/ChoiceScriptIDE/cside-choicescript"
    });
    logs = await prom(autotest_process);

    var exitCodeLog = logs.find(function(log) {
        return log.type === "exitCode";
    });

    var exitCode = exitCodeLog !== "undefined" ? exitCodeLog.value : undefined;
    start();
    equal(exitCode, 0);
});

asyncTest("cside-compile", async function() {
    var autotest_process = cp.fork("compile.js", ["mygame.html"], {
        //cwd: "/Users/carey/Documents/Work/Github/ChoiceScriptIDE/cside-choicescript/"
    });
    logs = await prom(autotest_process);

    var exitCodeLog = logs.find(function(log) {
        return log.type === "exitCode";
    });
    //console.log(logs);
    var exitCode = exitCodeLog !== "undefined" ? exitCodeLog.value : undefined;
    start();
    equal(exitCode, 0);
    ok(fs.existsSync("mygame.html"));
});

asyncTest("cside-randomtest", async function() {
    var randomtest_process = cp.fork("randomtest.js", ["num=1000", "game=mygame", "seed=0", "delay=false", "trial=false"], {
    //   cwd: "/Users/carey/Documents/Work/Github/ChoiceScriptIDE/cside-choicescript"
    });
    logs = await prom(randomtest_process);

    var exitCodeLog = logs.find(function(log) {
        return log.type === "exitCode";
    });

    //console.log(logs);
    var exitCode = exitCodeLog !== "undefined" ? exitCodeLog.value : undefined;
    start();
    equal(exitCode, 0);
});