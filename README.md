Cómo usar.
==========

1. Enlazar los archivos en este orden
    <script src="babylon.max.js"></script>
    <script src="babylon.loader.min.js"></script>
    <script src="iphone3d.js"></script>

2. Crear un element html canvas
	<canvas id="canvas"></canvas>

3. Asignar el tamano del canvas mendiante css
		<style>
			#canvas {
				width: 100%;
				height: 100%;
			}
		</style>

4. Modificar valores en el archivo iphone3d.js

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