const content = [
    { main: "Hey, I'm Illia Kulbachnyi. I run<br><a href='https://cosmos.studio/'>Cosmos Studio</a> an Al-Native<br>Product Design Agengy." },
    { main: "We do Product Design (UX/UI).", sub: "We design logic, from CUM to Pixel-Pertect interfaces." },
    { main: "***" },
    { main: "Al Sound & Audio Branding.", sub: "Sound is 30% of the vibe, mique M-powered midio identity." },
    { main: "***" },
    { main: "Brand Identity Design.", sub: "Cinematic brand imiverses, visual language that tells the story." },
    { main: "***" },
    { main: "Al Video Generation & Direction.", sub: "Directing generative video, Sora, Runway, and art direction." },
    { main: "***" },
    { main: "Web Development.", sub: "Webflow, WordPress, React, whatever we bring designs to life," },
    { main: "***" },
    { main: "Pitch Deck Design.", sub: "Presentations that raise capital, metries into stories" },
    { main: "***" },
    { main: "Also, a building <a href='https://aim.coach/'>AIM Fitness</a> marketplace where you can find your fitness coach." },
    { main: "Currently based in Bali. Local time: <span id='bali-time'></span>" },
    { main: "I study electronic music and Al experiments. Here is my <a href='http://googleusercontent.com/spotify.com/5'>Spotify</a>." },
    { main: "Consulting on design and agency management. Obsessed with fantasy books: Witcher, Game of Thrones etc." },
    { main: "Dreaming of making films like Nolan and music like Fred again." },
    { main: "Follow the journey: <a href='https://www.instagram.com/kulbachny'>Instagram</a>, <a href='https://www.linkedin.com/in/kulbachny/'>LinkedIn</a>, Tik Tok. Let's collaborate or be friends. Talk to me." }
];

const wheel = document.getElementById('wheel');
const totalItems = content.length;
const radius = window.innerWidth < 768 ? 220 : 350;
const angleStep = 360 / totalItems;

content.forEach((itemData, i) => {
    const item = document.createElement('div');
    item.className = 'drum-item';
    let innerHTML = `<div class="main-text">${itemData.main}</div>`;
    if (itemData.sub) innerHTML += `<div class="sub-text">${itemData.sub}</div>`;
    item.innerHTML = innerHTML;
    const angle = i * angleStep;
    item.style.transform = `rotateX(${-angle}deg) translateZ(${radius}px)`;
    wheel.appendChild(item);
});

// ПРИВ'ЯЗКА ДО НАТИВНОГО СКРОЛУ
window.addEventListener('scroll', () => {
    // Коефіцієнт 0.25 відповідає за швидкість обертання при скролі
    const currentRotation = window.scrollY * 0.25;
    
    gsap.to(wheel, {
        rotateX: currentRotation,
        duration: 0.4, // Маленька затримка для плавності
        ease: "power1.out",
        onUpdate: () => updateVisibility(currentRotation)
    });
}, { passive: true });

function updateVisibility(currentRotation) {
    const items = document.querySelectorAll('.drum-item');
    items.forEach((item, i) => {
        const itemAngle = (i * angleStep - currentRotation) % 360;
        const normalizedAngle = Math.abs(itemAngle > 180 ? itemAngle - 360 : itemAngle);
        
        if (normalizedAngle < 15) {
            item.style.opacity = "1";
            item.style.pointerEvents = "auto";
        } else if (normalizedAngle < 50) {
            item.style.opacity = "0.15";
            item.style.pointerEvents = "none";
        } else {
            item.style.opacity = "0";
            item.style.pointerEvents = "none";
        }
    });
}

function updateTime() {
    const options = { timeZone: 'Asia/Makassar', hour: '2-digit', minute: '2-digit', hour12: true };
    const el = document.getElementById('bali-time');
    if (el) el.innerText = new Date().toLocaleTimeString('en-US', options);
}

setInterval(updateTime, 1000);
updateTime();
updateVisibility(0);