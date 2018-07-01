knownScenes = [];
var scene_object = "";
var success = true;
var skip = false;
var loadFailed = false;

var rootDir;

if (typeof process != "undefined") {
  var outputFile = process.argv[2];
  if (!outputFile) throw new Error("Specify an output file on the command line");
  rootDir = process.argv[3];
  if (rootDir) {
    rootDir += (rootDir.lastIndexOf("/") == rootDir.length()-1) ? "/" : "";
  } else {
    rootDir = "web/";
  }
  fs = require('fs');
  path = require('path');
  vm = require('vm');
  load = function(file) {
    vm.runInThisContext(fs.readFileSync(file), file);
  };
  load("web/scene.js");
  load("web/navigator.js");
  load("web/util.js");
  load("headless.js");
  load("web/mygame/mygame.js");
  compile();
}

if (!rootDir) throw new Error("Specify a project to compile");

function compile(){
  var allScenes = {};
  fs.readdir(rootDir, function(err, filepaths) {
    if (!err) {
      var files = filepaths.filter(function(path) {
        return (path.substring(path.lastIndexOf("."), path.length) === ".txt");
      });
      files.forEach(function(file, index) {
        var scene_data = fs.readFileSync(rootDir+file, 'utf8');
        var scene = new Scene();
        scene.loadLines(scene_data);
        var sceneName = file.replace(/\.txt/gi,"");
        if (!sceneName.match(/^[\w-\s]+$/)) return; // should we warn?
        allScenes[sceneName] = {};
        allScenes[sceneName].crc = scene.temps.choice_crc;
        allScenes[sceneName].labels = scene.labels;
        allScenes[sceneName].lines = scene.lines;
      });
      console.log(JSON.stringify(allScenes));
    } else {
      throw new Error(err);
    }
  });
}
