import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const cnt_20_st =(2.352, 5.867, 2.393);
const cnt_40_st =( 2.352, 12.032, 2.393);

// const type_20_st = {x:5.867, y:2.352, z:2.393};


// const geometry = new THREE.BoxGeometry( type_20_st.x, type_20_st.y, type_20_st.z);
const geometry_20 = new THREE.BoxGeometry(cnt_20_st);
const geometry_40 = new THREE.BoxGeometry(cnt_40_st);
const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const material = new THREE.MeshBasicMaterial();
const cnt_20 = new THREE.Mesh( geometry_20, material );
const cnt_40 = new THREE.Mesh( geometry_40, material );
scene.add(cnt_20);
scene.add(cnt_40);

camera.position.z = 5;
// cube.rotation.x = 0.5;
// cube.rotation.y = 0.5;
cnt_40.position.x = 4;

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);


function animate() {
	requestAnimationFrame( animate );

	cnt_20.rotation.x += 0.01;
	cnt_20.rotation.y += 0.01;

	// cnt_40.rotation.x += 0.01;
	// cnt_40.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();