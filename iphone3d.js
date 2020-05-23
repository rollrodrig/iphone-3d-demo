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
var FILE_PATH = "public/iphone/";
var FILE_NAME = "iphone.obj";
var Y_ROTATION = 0;
var Z_ROTATION = 65;
var DISTANCE = 2000;
var H_LIGHT_1 = [4, 2, 3, 1]
var D_LIGHT_1 = [-5, 10, 8, 0.75]
var D_LIGHT_2 = [5, 1, 2, 0.85]
window.addEventListener('load', function () {
    var canvas = getCanvas('canvas');
    var engine = addEngine(canvas);
    var createScene = function() {
        var scene = addScene(engine);
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
        var b1 = addBox(scene, "b1", {});
        var camera = addCamera(scene, canvas, Y_ROTATION, Z_ROTATION, DISTANCE);
            camera.attachControl(canvas, true);
        // BABYLON.OBJFileLoader.MATERIAL_LOADING_FAILS_SILENTLY = true;
        BABYLON.SceneLoader.ImportMesh("", FILE_PATH, FILE_NAME, scene, function (newMeshes) {
            // Set the target of the camera to the first imported mesh
            camera.target = newMeshes[0];
        });
        return scene;
    }
    var scene = createScene();
    engine.runRenderLoop(function(){
        scene.render();
    });
});































