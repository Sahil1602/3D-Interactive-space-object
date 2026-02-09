import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ 
  canvas: document.querySelector('#bg') as HTMLCanvasElement
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )

camera.position.setZ(30)

renderer.render(scene, camera)

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })

const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, side: THREE.DoubleSide })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 1000)

pointLight.position.set(0,0,0)


const ambientLight = new THREE.AmbientLight(0xffffff, 10)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 200)
scene.add(pointLight, lightHelper, ambientLight, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement)

const addStar = () => {
  const sphere = new THREE.SphereGeometry(0.25, 24, 24)
  const starMaterial = new THREE.MeshStandardMaterial({ color: 0xffea00 })
  const star = new THREE.Mesh(sphere, starMaterial)

  const [x, y, z] = Array.from({ length: 3 }, () => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)
  scene.add(star)
}

const spaceTexture = new THREE.TextureLoader().load('./../static/outer-space-background.jpg')
scene.background = spaceTexture

function animate() {
  requestAnimationFrame( animate )
  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01
  controls.update()
  renderer.render(scene, camera)
}

Array.from({ length: 200 }).forEach(addStar)

// renderer.render(scene, camera)

animate()
