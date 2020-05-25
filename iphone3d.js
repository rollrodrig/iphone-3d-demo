/*========*/
// CUSTOMIZATION VARIABLES
var CANVAS_ID = "canvas"; // html canvas id container
var FILE_PATH = "public/iphone/"; // path to 3d model
var FILE_NAME = "iphone.obj"; // 3d model file name
var Y_ROTATION = 120; //  rotate the camera on Y axis
var Z_ROTATION = 85; //  rotate the camera on Z axis
var DISTANCE = 300; // distance to the model
var H_LIGHT_1 = [4, 2, 3, 1] // direction of the light: [x, y, z, intensity]
var D_LIGHT_1 = [-5, 10, 8, 0.75] // direction of the light: [x, y, z, intensity]
var D_LIGHT_2 = [5, 1, 2, 0.85] // direction of the light: [x, y, z, intensity]
var BG_COLOR = [112, 78, 186] // background color: : [R, B, G]

/*
    DONT TOUCH ANYTHING BELOW THIS LINE
    ===================================
*/


var Engine = BABYLON.Engine;
var Scene = BABYLON.Scene;
var ArcRotateCamera = BABYLON.ArcRotateCamera;
var Vector3 = BABYLON.Vector3;
var Vector4 = BABYLON.Vector4;
var HemisphericLight = BABYLON.HemisphericLight;
var DirectionalLight = BABYLON.DirectionalLight;
var PointLight = BABYLON.PointLight;
var MeshBuilder = BABYLON.MeshBuilder;
var Mesh = BABYLON.Mesh;
var DynamicTexture = BABYLON.DynamicTexture;
var Texture = BABYLON.Texture;
var Color3 = BABYLON.Color3;
var StandardMaterial = BABYLON.StandardMaterial;
var SpotLight = BABYLON.SpotLight;
var Animation = BABYLON.Animation;
function degToRadians(d) {
    return d*(Math.PI/180);
}
function addCamera(scene, canvas, z, y, distance){
    var camera =  
        new BABYLON.ArcRotateCamera(
            "Camera",
            degToRadians(z),
            degToRadians(y),
            distance,
            new BABYLON.Vector3.Zero(),
            scene
    );
    camera.attachControl(canvas, true);
    return camera;
}
function addBox(scene, name, options){
    return MeshBuilder.CreateBox(name, options, scene);
}
function addEngine(canvas) {
    return new Engine(canvas, true);
}
function getCanvas(id) {
    return document.getElementById(id);
}
function addScene(engine) {
    return new Scene(engine);
}
function addLine(name, direction, scene) {
    var line = Mesh.CreateLines(name, [
            new BABYLON.Vector3(0, 0, 0),
            direction,
        ], scene);
    return line;
}
function addHemiLight(name, position, intensity, scene, helper) {
    if(helper) {
        addLine(name+"-line-helper", position, scene)
    }
    var light = new HemisphericLight(name, position, scene);
        light.intensity = intensity;
    return light
}
function addDirecLight(name, position, intensity, scene, helper) {
    var light = new DirectionalLight(name, position, scene);
        light.intensity = intensity;
    if(helper) {
        addLine(name+"-line-helper", position, scene)
    }
    return light;
}
function setBgColor(BG_COLOR) {
    return new BABYLON.Color3(BG_COLOR[0]/255, BG_COLOR[1]/255, BG_COLOR[2]/255);
}
window.addEventListener('load', function () {
    var canvas = getCanvas(CANVAS_ID);
    var engine = addEngine(canvas);
    var createScene = function() {
        var scene = addScene(engine);
            scene.clearColor = setBgColor(BG_COLOR)
            scene.useRightHandedSystem = true;
        var hlight = addHemiLight(
            "hemiLight",
            new Vector3(H_LIGHT_1[0], H_LIGHT_1[1], H_LIGHT_1[2]),
            H_LIGHT_1[3],
            scene,
            // true
        );
        var lightBottom = addDirecLight(
            "lightBottom",
            new Vector3(D_LIGHT_1[0],D_LIGHT_1[1], D_LIGHT_1[2]),
            D_LIGHT_1[3],
            scene,
            // true
        );
        var lightBehind = addDirecLight(
            "lightBehind",
            new Vector3(D_LIGHT_2[0],D_LIGHT_2[1], D_LIGHT_2[2]),
            D_LIGHT_2[3],
            scene,
            // true
        );
        var b1 = addBox(scene, "b1", {size: 0.1});
        var camera = addCamera(scene, canvas, Y_ROTATION, Z_ROTATION, DISTANCE);
            camera.attachControl(canvas, true);
        BABYLON.SceneLoader.showloadingscreen = false;
        BABYLON.SceneLoader.ImportMesh("", FILE_PATH, FILE_NAME, scene, onModelLoaded, onModelProgress);
        function onModelLoaded(newMeshes) {
            console.log("model loaded")
        }
        function onModelProgress(newMeshes) {
            console.log("loading model")
        }

        return scene;
    }
    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    });
});































