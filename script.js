let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
let renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
let controls = new THREE.OrbitControls(camera,renderer.domElement);
controls.enableDamping = true;

// Lighting
scene.add(new THREE.AmbientLight(0xffffff,0.6));
let light = new THREE.PointLight(0xffffff,1);
light.position.set(10,10,10);
scene.add(light);

// Pantun List
const pantunList = [
`Pergi haji ke tanah suci
Membawa hati penuh harapan
Dunia hanya tempat menguji
Akhirat tujuan kehidupan`,

`Bintang bersinar di langit malam
Indah cahaya menyinari bumi
Cinta sejati bukan sekadar dalam
Tapi menuju ridha Ilahi`,

`Sahur bersama keluarga tercinta
Menanti azan penuh bahagia
Ramadhan datang membawa cinta
Bulan ampunan penuh pahala`
];

let currentPantun = 0;

// Function create text texture
function createTextTexture(text){
    let canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    let ctx = canvas.getContext("2d");

    ctx.fillStyle = "#001a1a";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ffcc";
    ctx.font = "50px Arial";
    ctx.textAlign = "center";

    let lines = text.split("\n");
    lines.forEach((line,i)=>{
        ctx.fillText(line,512,400 + i*70);
    });

    return new THREE.CanvasTexture(canvas);
}

// Cube with text
let geometry = new THREE.BoxGeometry(3,3,3);
let materials = [];

for(let i=0;i<6;i++){
    materials.push(new THREE.MeshStandardMaterial({
        map:createTextTexture(pantunList[currentPantun])
    }));
}

let cube = new THREE.Mesh(geometry,materials);
scene.add(cube);

// Mosque Dome
let dome = new THREE.Mesh(
    new THREE.SphereGeometry(2,32,32,0,Math.PI*2,0,Math.PI/2),
    new THREE.MeshStandardMaterial({color:0x228B22})
);
dome.position.y=-3;
scene.add(dome);

// Minarets
function createMinaret(x){
    let group = new THREE.Group();

    let body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5,0.7,6,32),
        new THREE.MeshStandardMaterial({color:0xffffff})
    );

    let top = new THREE.Mesh(
        new THREE.ConeGeometry(0.7,2,32),
        new THREE.MeshStandardMaterial({color:0x00ffcc})
    );
    top.position.y=4;

    group.add(body);
    group.add(top);
    group.position.x = x;
    group.position.y = -1;
    scene.add(group);
}

createMinaret(-6);
createMinaret(6);

// Stars
let starGeo = new THREE.BufferGeometry();
let starVertices=[];
for(let i=0;i<1000;i++){
    starVertices.push(
        (Math.random()-0.5)*2000,
        (Math.random()-0.5)*2000,
        (Math.random()-0.5)*2000
    );
}
starGeo.setAttribute('position',new THREE.Float32BufferAttribute(starVertices,3));
let starField = new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xffffff}));
scene.add(starField);

camera.position.z=8;

// Click change pantun
window.addEventListener("click",()=>{
    currentPantun = (currentPantun+1)%pantunList.length;
    cube.material.forEach(m=>{
        m.map = createTextTexture(pantunList[currentPantun]);
        m.needsUpdate = true;
    });
});

// Animation
function animate(){
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    dome.rotation.y += 0.005;
    controls.update();
    renderer.render(scene,camera);
}
animate();

// Mode & Music
function toggleMode(){
    document.body.classList.toggle("day");
    document.body.classList.toggle("night");
}

let music=document.getElementById("bgm");
function toggleMusic(){
    music.paused?music.play():music.pause();
}

// Resize
window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
});
