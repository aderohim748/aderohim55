// Sakura Generator
for (let i = 0; i < 30; i++) {
  let sakura = document.createElement("div");
  sakura.classList.add("sakura");
  sakura.innerHTML = "🌸";
  sakura.style.left = Math.random() * 100 + "vw";
  sakura.style.animationDuration = (5 + Math.random() * 5) + "s";
  document.body.appendChild(sakura);
}

// Amplop buka
function openEnvelope(el) {
  el.classList.toggle("open");
}

// Mode gelap/terang
function toggleMode() {
  document.body.classList.toggle("light");
}

// EmailJS setup
(function(){
  emailjs.init("YOUR_PUBLIC_KEY");
})();

document.getElementById("rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();
  emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
  .then(() => {
    alert("RSVP berhasil dikirim!");
    this.reset();
  });
});
