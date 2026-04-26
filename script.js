const content = [
    { main: "Hey, I'm Illia Kulbachnyi. I run<br><a href='https://cosmos.studio/'>Cosmos Studio</a> — a Digital<br>Design Agency." },
    { main: "We do Product Design (UX/UI).", sub: "We design logic, from CTA to Pixel-Perfect interfaces." },
    { main: "***" },
    { main: "AI Sound & Audio Branding.", sub: "Sound is 30% of the vibe. AI-powered audio identity." },
    { main: "***" },
    { main: "Brand Identity Design.", sub: "Cinematic brand universes, visual language that tells the story." },
    { main: "***" },
    { main: "AI Video Generation & Direction.", sub: "Directing generative video: Sora, Runway, and art direction." },
    { main: "***" },
    { main: "Web Development.", sub: "Webflow, WordPress, React — whatever it takes, we bring designs to life." },
    { main: "***" },
    { main: "Pitch Deck Design.", sub: "Presentations that raise capital, metrics into stories." },
    { main: "***" },
    { main: "Also building <a href='https://aim.coach/'>AIM Fitness</a> — a marketplace where you can find your fitness coach." },
    { main: "Currently based in Bali. Local time: <span id='bali-time'></span>" },
    { main: "I study electronic music and AI experiments. Here is my <a href='https://open.spotify.com/artist/32Rkx97vwsJu15l5W28jcB?si=raEZbWLfTgSyenP7SbSRQw'>Spotify</a>." },
    { main: "Consulting on design and agency management. Obsessed with fantasy books: Witcher, Game of Thrones etc." },
    { main: "Follow the journey: <a href='https://www.instagram.com/kulbachny'>Instagram</a>, <a href='https://www.linkedin.com/in/kulbachny/'>LinkedIn</a>, <a href='https://www.tiktok.com/@kulbachny'>TikTok</a>. Let's collaborate or be friends. Talk to me." }
];

const wheel = document.getElementById('wheel');
const totalItems = content.length;
const radius = window.innerWidth < 768 ? 220 : 340;
const angleStep = 360 / totalItems;

content.forEach((itemData, i) => {
    const item = document.createElement('div');
    item.className = itemData.main === '***' ? 'drum-item drum-item--sep' : 'drum-item';
    let innerHTML = `<div class="main-text">${itemData.main}</div>`;
    if (itemData.sub) innerHTML += `<div class="sub-text">${itemData.sub}</div>`;
    item.innerHTML = innerHTML;
    const angle = i * angleStep;
    item.style.transform = `rotateX(${-angle}deg) translateZ(${radius}px)`;
    wheel.appendChild(item);
});

// Linear page height: scroll from item 0 to last item
document.body.style.height = ((totalItems - 1) * angleStep / 0.25 + window.innerHeight + 400) + 'px';

window.addEventListener('scroll', () => {
    gsap.to(wheel, {
        rotateX: window.scrollY * 0.25,
        duration: 0.4,
        ease: "power1.out",
        onUpdate: function() {
            updateVisibility(gsap.getProperty(wheel, 'rotateX'));
        }
    });
}, { passive: true });

function updateVisibility(currentRotation) {
    const items = document.querySelectorAll('.drum-item');
    const fadeZone = angleStep * 3;
    items.forEach((item, i) => {
        const diff = Math.abs(i * angleStep - currentRotation);
        const opacity = diff < fadeZone ? Math.pow(1 - diff / fadeZone, 1.5) : 0;
        item.style.opacity = opacity.toFixed(3);
        item.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
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
