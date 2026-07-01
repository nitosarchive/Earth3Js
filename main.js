import * as THREE from "./node_modules/three/build/three.module.js";
import { OrbitControls } from './node_modules/three/addons/controls/OrbitControls.js';
import BlendMode from './node_modules/three/src/renderers/common/BlendMode.js';


const w = window.innerWidth;
const h = window.innerHeight;


const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000 )
camera.position.z = 80;
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

controls.enableDamping = true;
const loader =  new THREE.TextureLoader();
const light = new THREE.DirectionalLight(0xffffff, 3);
light.position.set(4, 1, -1)
scene.add(light)
const geo = new THREE.IcosahedronGeometry(1, 12)

//Earth
const earthObj= new THREE.Object3D();
const earthGroup = new THREE.Group();
const earthMap = loader.load("./imgs/world.topo.bathy.200408.3x5400x2700.jpg");
const material = new THREE.MeshStandardMaterial({map: earthMap});
const earth = new THREE.Mesh(geo, material);
earth.rotation.z = -23.4 * Math.PI / 100;
const earthNight = new THREE.MeshBasicMaterial(
  {map: loader.load("./imgs/2k_earth_nightmap.jpg"),
    blending: THREE.AdditiveBlending
  }
);
const lightMesh = new THREE.Mesh(geo, earthNight)
earthGroup.add(earth);
earthGroup.add(lightMesh);
earthObj.add(earthGroup);
lightMesh.rotation.z = -23.4 * Math.PI / 100;
earthGroup.position.x = -47

const cloudMat = new THREE.MeshStandardMaterial({
  map: loader.load("./imgs/8k_earth_clouds.jpg"),
  blending: THREE.AdditiveBlending
});

const cloudMesh = new THREE.Mesh(geo, cloudMat);
earthGroup.add(cloudMesh);(0xffffff);
cloudMesh.rotation.z = -23.4 * Math.PI / 100;

//Moon
const moonObj = new THREE.Object3D();
const moonMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/8k_moon.jpg")});
const moon = new THREE.Mesh(geo, moonMat);
moon.scale.setScalar(0.4);
moon.position.z = 3
moonObj.add(moon);
earth.add(moonObj);

//Render Update

 function render(){
  controls.update();
  earthGroup.rotateY(0.01);
  earthObj.rotateY(0.005);
  moon.rotateY(0.01);
  sun.rotation.y += 0.01/ 24;
  mercObj.rotateY(0.03);
  merc.rotateY(0.07);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth/ window.innerHeight;
  camera.updateProjectionMatrix();
  venGroup.rotateY(0.001);
  venObj.rotateY(0.007);
  mars.rotateY(0.09);
  marsObj.rotateY(0.0045);
  satObj.rotateY(0.0005);
  sat.rotateY(0.045);
  juipObj.rotateY(0.001);
  juipGroup.rotateY(0.05);
  anusObj.rotateY(0.00002);
  anusGroup.rotateY(0.015);
  nepObj.rotateY(0.00001);
  nepGroup.rotateY(0.025);
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

//Sun
const sunMat = new THREE.MeshBasicMaterial({map: loader.load("./imgs/8k_sun.jpg")})
const sun = new THREE.Mesh(geo, sunMat);
sun.scale.setScalar(5);



//Mercury
const mercObj = new THREE.Object3D();
const mercMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/8k_mercury.jpg")});
const merc = new THREE.Mesh(geo, mercMat);
merc.scale.setScalar(0.5);
mercObj.add(merc);
merc.position.x = -17;


//Venus
const venObj = new THREE.Object3D();
const venGroup = new THREE.Group();
const venMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/8k_venus_surface.jpg")});
const venus = new THREE.Mesh(geo, venMat);
const venAtmosMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/4k_venus_atmosphere.jpg"), blending: THREE.AdditiveBlending});
const venAtmos = new THREE.Mesh(geo, venAtmosMat);
venGroup.add(venus);
venGroup.add(venAtmos);
venObj.add(venGroup);
const venGlow = new THREE.PointLight( 0xff0000, 1, 100 );
venGlow.position.set( 50, 50, 50 );
venObj.add(venGlow);
venGroup.position.x = -27;


//Mars
const marsObj = new THREE.Object3D();
const marsMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/8k_mars.jpg")});
const mars = new THREE.Mesh(geo, marsMat);
mars.scale.setScalar(0.7);
marsObj.add(mars)
mars.position.x = -65;


// Rings
const ringGeo = new THREE.RingGeometry(10, 6, 64);
let pos = ringGeo.attributes.position
var v3 = new THREE.Vector3();
for (let i = 0; i < pos.count; i++){
    v3.fromBufferAttribute(pos, i);
    ringGeo.attributes.uv.setXY(i, v3.length() < 9 ? 0 : 1, 1);
}


const ringMat = new THREE.MeshBasicMaterial({
  map: loader.load("./imgs/backscattered.png"),
  side: THREE.DoubleSide,
  color: 0xffffff
});

const rings = new THREE.Mesh(ringGeo, ringMat);
rings.rotation.x = 80;

// Saturn

const satMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/8k_saturn.jpg")});
const sat = new THREE.Mesh(geo, satMat);
sat.scale.setScalar(3)
const satGroup = new THREE.Group();
satGroup.position.x = -80
satGroup.add(sat, rings);
const satObj = new THREE.Object3D()
satObj.add(satGroup);

//Juipiter

const juipMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/8k_jupiter.jpg")})
const juip = new THREE.Mesh(geo, juipMat);
juip.scale.setScalar(3.5)
const juipGroup = new THREE.Group();
juipGroup.position.x = -95
juipGroup.add(juip);
const juipObj = new THREE.Object3D();
juipObj.add(juipGroup);

//Uranus
const anusMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/2k_uranus.jpg")})
const anus = new THREE.Mesh(geo, anusMat);
anus.scale.setScalar(2.5)
const anusGroup = new THREE.Group();
anusGroup.position.x = -110;
anusGroup.add(anus);
const anusObj = new THREE.Object3D()
anusObj.add(anusGroup);

//Neptune

const nepMat = new THREE.MeshStandardMaterial({map: loader.load("./imgs/2k_neptune.jpg")})
const nep = new THREE.Mesh(geo, nepMat);
nep.scale.setScalar(2.35)
const nepGroup = new THREE.Group();
nepGroup.position.x = -130;
nepGroup.add(nep);
const nepObj = new THREE.Object3D()
nepObj.add(nepGroup);

//Scene
scene.add(sun);
scene.add(marsObj, venObj, earthObj, mercObj, satObj, juipObj, anusObj, nepObj);
scene.background = loader.load("./imgs/stars.jpg");
renderer.render(scene, camera);
render()






