const world = Globe()
  (document.getElementById('globe'))
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .backgroundColor('#000')
  .arcColor(() => '#ff4d4f')
  .arcDashLength(0.4)
  .arcDashGap(0.2)
  .arcDashAnimateTime(1500)
  .arcAltitude(0.2);

world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.6;

const countries = [
  { name: "USA", lat: 37, lng: -95 },
  { name: "China", lat: 35, lng: 104 },
  { name: "Russia", lat: 60, lng: 100 },
  { name: "Germany", lat: 51, lng: 10 },
  { name: "Brazil", lat: -10, lng: -55 },
  { name: "India", lat: 21, lng: 78 },
  { name: "Indonesia", lat: -2, lng: 113 },
  { name: "Australia", lat: -25, lng: 133 }
];

const attackTypes = ["DDoS", "Phishing", "Malware", "Ransomware"];

let attacks = [];
let stats = {};
let total = 0;

function randomCountry() {
  return countries[Math.floor(Math.random() * countries.length)];
}

function randomAttack() {
  const from = randomCountry();
  let to = randomCountry();
  if (from === to) to = randomCountry();

  const type = attackTypes[Math.floor(Math.random() * attackTypes.length)];

  return {
    startLat: from.lat,
    startLng: from.lng,
    endLat: to.lat,
    endLng: to.lng,
    type: type
  };
}

function updateStats(type) {
  total++;
  stats[type] = (stats[type] || 0) + 1;

  document.getElementById("total").innerText = total;

  const statsDiv = document.getElementById("stats");
  statsDiv.innerHTML = "";

  Object.keys(stats).forEach(key => {
    const div = document.createElement("div");
    div.innerHTML = `<span>${key}</span><span>${stats[key]}</span>`;
    statsDiv.appendChild(div);
  });
}

function simulateAttack() {
  const attack = randomAttack();
  attacks.unshift(attack);
  attacks = attacks.slice(0, 50);

  const filter = document.getElementById("filter").value;

  const filtered = filter === "All"
    ? attacks
    : attacks.filter(a => a.type === filter);

  world.arcsData(filtered);
  updateStats(attack.type);
}

setInterval(simulateAttack, 2000);

document.getElementById("filter").addEventListener("change", () => {
  world.arcsData(attacks);
});

