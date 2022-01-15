import { Engine } from "@babylonjs/core/Engines/engine";
import { Scene } from "@babylonjs/core/scene";
import { Color3, Color4, MeshBuilder, DirectionalLight } from '@babylonjs/core';
import { Vector3 } from '@babylonjs/core/Maths/math';
import "@babylonjs/core/Meshes/meshBuilder";
import * as BABYLON from '@babylonjs/core';
window["BABYLON"] = {...BABYLON};
import("@babylonjs/inspector");
//import "@babylonjs/gui";

let c = document.getElementById("renderCanvas"); // Get the canvas element 
let engine = new Engine(c, true); // Generate the BABYLON 3D engine
let scene = new Scene(engine)
scene.debugLayer.show();
scene.clearColor = new Color4(0.02, 0.02, 0.02, 1);
let VRHelper = scene.createDefaultVRExperience({ rayLength: 1000, laserToggle: false, useMultiview: false });
VRHelper.enableInteractions();
scene.activeCamera.maxZ = 1E8;
VRHelper.onAfterEnteringVRObservable.add(() => {
    scene.activeCamera.maxZ = 1E8;
    VRHelper.changeLaserColor(new Color3(0.5, 0.1, 0.1));
});
var light = new DirectionalLight("DirectionalLight", new Vector3(0, -1, 0), scene);
light.diffuse = new Color3(1, 0, 0);
light.specular = new Color3(0, 1, 0);
var sphere = MeshBuilder.CreateSphere("sphere", {}, scene);
engine.runRenderLoop(function () {
    scene.render();
});
// Watch for browser/canvas resize events
window.addEventListener("resize", function () {
    engine.resize();
});
