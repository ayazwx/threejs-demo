import { useState } from 'react'
import './App.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

function App() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.setZ(30)
  camera.position.setX(-3)
  renderer.render(scene, camera)

  
  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 })
  const torus = new THREE.Mesh(geometry, material)
  scene.add(torus)
  const pointLight = new THREE.PointLight(0xffffff)
  pointLight.position.set(5, 5, 5)
  const ambientLight = new THREE.AmbientLight(0xffffff)
  scene.add(pointLight, ambientLight)

  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)

  scene.add(lightHelper, gridHelper)

  const controls = new OrbitControls(camera, renderer.domElement)


  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x, y, z)
    scene.add(star)
  }

  Array(200).fill().forEach(addStar)

  const spaceTexture = new THREE.TextureLoader().load('space.jpg')
  scene.background = spaceTexture


  const threejsTexture = new THREE.TextureLoader().load('threejs.png')

  const threejs = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: threejsTexture })
  )
  scene.add(threejs)

  const moonTexture = new THREE.TextureLoader().load('moon.jpg')
  const normalTexture = new THREE.TextureLoader().load('normal.jpg')

  const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  )
  moon.position.z = 30
  moon.position.setX(-10)
  scene.add(moon)

  const worldTexture = new THREE.TextureLoader().load('earthmap.jpg')
  const worldNormalTexture = new THREE.TextureLoader().load('normal.jpg')

  const world = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: worldTexture,
      normalMap: worldNormalTexture,
    })
  )
  world.position.z = -20
  world.position.setX(20)
  world.position.y = 20
  scene.add(world)

  const sunTexture = new THREE.TextureLoader().load('sun.jpg')
  const sunNormalTexture = new THREE.TextureLoader().load('normal.jpg')

  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(6, 32, 32),
    new THREE.MeshStandardMaterial({
      map: sunTexture,
      normalMap: sunNormalTexture,
    })
  )
  sun.position.z = -20
  sun.position.setX(-20)
  sun.position.y = 20
  scene.add(sun)

  // const fontLoader = new THREE.FontLoader()
// loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
//    const geometry = new THREE.TextGeometry('Hello Three.js!', {
//       font: font,
//       size: 3,
//       height: 0.2,
//       curveSegments: 12,
//       bevelEnabled: false,
//       bevelThickness: 0.5,
//       bevelSize: 0.3,
//       bevelOffset: 0,
//       bevelSegments: 5,
//    })
// })

// const mesh = new THREE.Mesh(geometry, material)
// mesh.name = 'text'
// scene.add(mesh)

// const loader = new FontLoader();
// const font = loader.load(
// 	// resource URL
// 	'fonts/helvetiker_bold.typeface.json',

// 	// onLoad callback
// 	function ( font ) {
// 		// do something with the font
// 		console.log( font );
// 	},

// 	// onProgress callback
// 	function ( xhr ) {
// 		console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
// 	},

// 	// onError callback
// 	function ( err ) {
// 		console.log( 'An error happened' );
// 	}
// );

// const textGeometry = new THREE.TextGeometry( 'Hello three.js!', {
//   font: font,
//   size: 80,
//   height: 5,
//   curveSegments: 12,
//   bevelEnabled: true,
//   bevelThickness: 10,
//   bevelSize: 8,
//   bevelOffset: 0,
//   bevelSegments: 5
// } );




  function animate() {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.01
    torus.rotation.y += 0.005
    torus.rotation.z += 0.01

    controls.update()

    renderer.render(scene, camera)
  }
  animate()
 

  return (
    <>

    </>
  )
}

export default App
