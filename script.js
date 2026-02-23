// Scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(10,10,10);
scene.add(pointLight);

// Cube (Pantun Object)
const geometry = new THREE.BoxGeometry(3,3,3);
const material = new THREE.MeshStandardMaterial({
    color:0x00ffcc,
    metalness:0.3,
    roughness:0.2
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Mosque Dome
const domeGeometry = new THREE.SphereGeometry(
    2,
    32,
    32,
    0,
    Math.PI * 2,
    0,
    Math.PI/2
);
const domeMaterial = new THREE.MeshStandardMaterial({
    color:0x228B22
});
const dome = new THREE.Mesh(domeGeometry, domeMaterial);
dome.position.y = -3;
scene.add(dome);

// Stars
const starsGeometry = new THREE.BufferGeometry();
const starVertices = [];

for(let i=0;i<1000;i++){
    starVertices.push(
        (Math.random()-0.5)*2000,
        (Math.random()-0.5)*2000,
        (Math.random()-0.5)*2000
    );
}

starsGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(starVertices,3)
);

const starsMaterial = new THREE.PointsMaterial({color:0xffffff});
const starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);

camera.position.z = 8;

// Animation
function animate(){
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    dome.rotation.y += 0.005;

    renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize',()=>{
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});

// MODE TOGGLE
function toggleMode(){
    document.body.classList.toggle("day");
    document.body.classList.toggle("night");
}

// MUSIC
const music = document.getElementById("bgm");

function toggleMusic(){
    if(music.paused){
        music.play();
    } else {
        music.pause();
    }
}
