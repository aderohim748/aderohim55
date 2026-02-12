const globe = Globe()(document.getElementById("globe"))
  .globeImageUrl("//unpkg.com/three-globe/example/img/earth-night.jpg")
  .backgroundColor("#000")
  .arcColor(() => "#ff00ff")
  .arcDashLength(0.3)
  .arcDashGap(0.15)
  .arcDashAnimateTime(1000)
  .arcAltitude(0.25)
  .pointAltitude(0.01)
  .pointColor(() => "#00ffff")
  .pointRadius(0.3);

globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.8;

const countries = [
  { name: "USA", lat: 37, lng: -95 },
  { name: "China", lat: 35, lng: 104 },
  { name: "Russia", lat: 60, lng: 100 },
  { name: "Germany", lat: 51, lng: 10 },
  { name: "Brazil", lat: -10, lng: -55 },
  { name: "India", lat: 21, lng: 78 },
  { name: "Indonesia", lat: -2, lng: 113 }
];

const types = ["DDoS", "Phishing", "Malware", "Ransomware"];

let attacks = [];
let heatmap = {};
let total = 0;

function randomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

function createExplosion(lat, lng) {
  globe.pointsData([{ lat, lng, size: 1 }]);

  setTimeout(() => {
    globe.pointsData([]);
  }, 600);
}

function simulateAttack() {
  const from = randomCountry();
  let to = randomCountry();
  if (from === to) to = randomCountry();

  const type = types[Math.floor(Math.random() * types.length)];

  const attack = {
    startLat: from.lat,
    startLng: from.lng,
    endLat: to.lat,
    endLng: to.lng,
    type
  };

  attacks.unshift(attack);
  attacks = attacks.slice(0, 60);

  const filter = document.getElementById("filter").value;
  const filtered = filter === "All"
    ? attacks
    : attacks.filter(a => a.type === filter);

  globe.arcsData(filtered);

  // Explosion effect
  createExplosion(to.lat, to.lng);

  // Sound
  document.getElementById("alertSound").play();

  // Heatmap tracking
  heatmap[to.name] = (heatmap[to.name] || 0) + 1;
  total++;

  updateStats();
}

function updateStats() {
  document.getElementById("total").innerText = total;

  const heatDiv = document.getElementById("heatStats");
  heatDiv.innerHTML = "";

  Object.entries(heatmap)
    .sort((a,b) => b[1] - a[1])
    .forEach(([country, count]) => {
      const div = document.createElement("div");
      div.innerHTML = `<span>${country}</span><span>${count}</span>`;
      heatDiv.appendChild(div);
    });
}

setInterval(simulateAttack, 2000);

document.getElementById("filter").addEventListener("change", () => {
  globe.arcsData(attacks);
});
