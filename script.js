/* =========================
   3D MOUSE PARALLAX
========================= */

const scene = document.querySelector(".scene");

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX =
        (event.clientX / window.innerWidth - 0.5) * 2;

    mouseY =
        (event.clientY / window.innerHeight - 0.5) * 2;

    if (window.innerWidth > 900) {
        scene.style.transform = `
            rotateX(${-mouseY * 8}deg)
            rotateY(${mouseX * 10}deg)
        `;
    }
});


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".card, .about-content, .about-visual, .cta"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* =========================
   CARD TILT
========================= */

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX =
            (y - centerY) / 20;

        const rotateY =
            (centerX - x) / 20;

        card.style.transform = `
            perspective(800px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-8px)
        `;
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


/* =========================
   SMOOTH BUTTON FEEDBACK
========================= */

document.querySelectorAll("a[href^='#']").forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow = document.createElement("div");

cursorGlow.style.position = "fixed";
cursorGlow.style.width = "250px";
cursorGlow.style.height = "250px";
cursorGlow.style.borderRadius = "50%";
cursorGlow.style.pointerEvents = "none";
cursorGlow.style.zIndex = "-1";
cursorGlow.style.background =
    "radial-gradient(circle, rgba(157,92,255,.08), transparent 70%)";
cursorGlow.style.transform = "translate(-50%, -50%)";

document.body.appendChild(cursorGlow);

document.addEventListener("mousemove", (event) => {

    cursorGlow.style.left =
        `${event.clientX}px`;

    cursorGlow.style.top =
        `${event.clientY}px`;

});


/* =========================
   PARALLAX ON SCROLL
========================= */

window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    const grid = document.querySelector(".grid");

    grid.style.transform = `
        perspective(500px)
        rotateX(60deg)
        translateY(${-100 + scrollY * 0.08}px)
    `;

});
