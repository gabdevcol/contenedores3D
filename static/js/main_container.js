import * as THREE from 'three';

// Preparar la escena
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Añadir iluminación
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

//Cargar el modelo .obj
// var objLoader = new THREE.objLoader();
var objLoader = new THREE.OBJLoader();

console.log(objLoader);

objLoader.setPath('/static/model/'); // Especifica la ruta donde se encuentra tu archivo .obj
objLoader.load('12281_Container_v2_L2.obj', function (object) { // 'file.obj' es el nombre de tu archivo
  scene.add(object);
  object.position.set(0, 0, 0); // Puedes cambiar la posición según sea necesario
});


//Configurar la animación / render loop
function animate() {
    requestAnimationFrame(animate);
    
    // Aquí puedes agregar cualquier animación o actualización de tu objeto o escena
  
    renderer.render(scene, camera);
  }
  
 animate();
