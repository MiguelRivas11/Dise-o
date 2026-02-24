// 1. IMPORTACIONES (ES6 Modules)
// Usamos versiones JSM (JavaScript Modules) desde un CDN
// ✅ ESTO SÍ FUNCIONA (Usa direcciones web completas)
import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js';

// ... el resto de tu código sigue igual ...
// 2. CONFIGURACIÓN BÁSICA
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 3. CONTROLES (OrbitControls)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Inercia suave
controls.dampingFactor = 0.05;

// 4. OBJETOS

// --- El Cubo Verde ---
const geometryCube = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const materialCube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometryCube, materialCube);
cube.position.x = -2;
scene.add(cube);

// --- El Triángulo 3D (Prisma) Rosa ---
const geometryTriangle = new THREE.CylinderGeometry(1, 1, 0.8, 3);
const materialTriangle = new THREE.MeshBasicMaterial({ color: 0xff00ff }); // Magenta/Rosa
const triangle = new THREE.Mesh(geometryTriangle, materialTriangle);
triangle.position.x = 2;
scene.add(triangle);

// 5. ANIMACIÓN (Arrow Function)
const animate = () => {
    requestAnimationFrame(animate);

    // Actualizar controles (necesario para el damping)
    controls.update();

    // Rotación de objetos
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    triangle.rotation.x += 0.01;
    triangle.rotation.y -= 0.015;
    triangle.rotation.z += 0.005;

    renderer.render(scene, camera);
};

// 6. RESPONSIVIDAD
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Iniciar
animate();