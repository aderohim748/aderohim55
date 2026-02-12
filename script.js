// Database Kamera
const cameras = [
{
    name: "New York - Times Square",
    lat: 40.7580,
    lng: -73.9855,
    url: "https://www.earthcam.com/world/usa/newyork/timessquare/?cam=tsstreet"
},
{
    name: "Tokyo - Shibuya",
    lat: 35.6595,
    lng: 139.7005,
    url: "https://www.earthcam.com/world/japan/tokyo/shibuya/?cam=shibuya"
},
{
    name: "Paris - Eiffel Tower",
    lat: 48.8584,
    lng: 2.2945,
    url: "https://www.earthcam.com/world/france/paris/?cam=eiffeltower"
},
{
    name: "Rome - Colosseum",
    lat: 41.8902,
    lng: 12.4922,
    url: "https://www.earthcam.com/world/italy/rome/?cam=rome"
}
];

// Init Map
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Tambah Marker ke Map
cameras.forEach(cam => {
    const marker = L.marker([cam.lat, cam.lng]).addTo(map);

    marker.bindPopup(`
        <b>${cam.name}</b><br>
        <button onclick="addCamera('${cam.name}', '${cam.url}')">
            Lihat Kamera
        </button>
    `);
});

// Tambah kamera ke grid
function addCamera(name, url) {
    const grid = document.getElementById("cameraGrid");

    const card = document.createElement("div");
    card.className = "camera-card";

    card.innerHTML = `
        <div class="camera-title">${name}</div>
        <iframe src="${url}" allowfullscreen></iframe>
    `;

    grid.appendChild(card);
}

// Search lokasi
document.getElementById("searchBtn").addEventListener("click", function() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();

    const result = cameras.find(cam =>
        cam.name.toLowerCase().includes(keyword)
    );

    if (result) {
        map.setView([result.lat, result.lng], 10);
        addCamera(result.name, result.url);
    } else {
        alert("Lokasi tidak ditemukan");
    }
});

// Clear Grid
document.getElementById("clearBtn").addEventListener("click", function() {
    document.getElementById("cameraGrid").innerHTML = "";
});

