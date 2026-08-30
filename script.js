```javascript
/* =================================
   ELEMENTS
================================= */

const scene =
    document.getElementById("scene");

const videoBackground =
    document.querySelector(".video-background");

const grid =
    document.querySelector(".grid");

const glowOne =
    document.querySelector(".glow-one");

const glowTwo =
    document.querySelector(".glow-two");


/* =================================
   MOUSE PARALLAX
================================= */

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


/* Get mouse position */

document.addEventListener(
    "mousemove",
    (event) => {

        targetX =
            (event.clientX /
                window.innerWidth - .5);

        targetY =
            (event.clientY /
                window.innerHeight - .5);

    }
);


/* Smooth animation */

function animateParallax() {

    currentX +=
        (targetX - currentX) * .06;

    currentY +=
        (targetY - currentY) * .06;


    /* =========================
       VIDEO CAMERA MOVEMENT
    ========================= */

    const videoX =
        currentX * 12;

    const videoY =
        currentY * 8;

    const videoRotate =
        currentX * 1.2;


    videoBackground.style.transform = `
        translate3d(
            ${videoX}px,
            ${videoY}px,
            0
        )
        scale(1.05)
        rotate(${videoRotate}deg)
    `;


    /* =========================
       3D OBJECT MOVEMENT
    ========================= */

    const sceneRotateX =
        -currentY * 12;

    const sceneRotateY =
        currentX * 18;


    scene.style.transform = `
        rotateX(${sceneRotateX}deg)
        rotateY(${sceneRotateY}deg)
        translateZ(20px)
    `;


    /* =========================
       GRID DEPTH
    ========================= */

    grid.style.transform = `
        perspective(600px)
        rotateX(${65 - currentY * 3}deg)
        rotateZ(${currentX * 2}deg)
        translate(
            ${currentX * 12}px,
            ${currentY * 8}px
        )
    `;


    /* =========================
       CINEMATIC LIGHT MOVEMENT
    ========================= */

    glowOne.style.transform = `
        translate(
            ${currentX * 80}px,
            ${currentY * 60}px
        )
    `;

    glowTwo.style.transform = `
        translate(
            ${currentX * -60}px,
            ${currentY * -45}px
        )
    `;


    requestAnimationFrame(
        animateParallax
    );
}

animateParallax();


/* =================================
   CARD 3D TILT
================================= */

const cards =
    document.querySelectorAll(".card");


cards.forEach((card) => {

    card.addEventListener(
        "mousemove",
        (event) => {

            const rect =
                card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                (y - centerY) / 18;

            const rotateY =
                (centerX - x) / 18;


            card.style.transform = `
                perspective(900px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-8px)
                scale(1.015)
            `;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =================================
   SCROLL REVEAL
================================= */

const revealElements =
    document.querySelectorAll(
        ".card, .about-content, .about-visual, .cta"
    );


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                }
            );

        },
        {
            threshold: .15
        }
    );


revealElements.forEach(
    (element) => {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(40px)";

        element.style.transition =
            "opacity .9s ease, transform .9s ease";

        observer.observe(element);

    }
);


/* =================================
   SMOOTH ANCHOR
================================= */

document
    .querySelectorAll("a[href^='#']")
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");

                if (targetID === "#") return;

                const target =
                    document.querySelector(
                        targetID
                    );

                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


/* =================================
   VIDEO ERROR FALLBACK
================================= */

const video =
    document.getElementById("bgVideo");

video.addEventListener(
    "error",
    () => {

        document.body.classList.add(
            "video-error"
        );

        console.log(
            "Video background gagal dimuat."
        );

    }
);


/* =================================
   MOBILE OPTIMIZATION
================================= */

if (window.innerWidth <= 768) {

    document.body.classList.add(
        "mobile"
    );

}
```
