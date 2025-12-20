// -----------------------------
// INDEX.JS — for index.html only
// -----------------------------

function showSuggestions() {
    const input = document.getElementById("search").value.toLowerCase();
    const box = document.getElementById("suggestions");

    box.innerHTML = "";
    if (!input) return;

    const locations = {
        London: "images/london.png",
        Edinburgh: "images/edinburgh.png",
        Cardiff: "images/cardiff.png",
        Leeds: "images/leeds.png",
        Bristol: "images/bristol.png",
        Plymouth: "images/plymouth.png",
		Shetland: "images/shetland.png",
		Stornoway: '<h2>Stornoway</h2><p>Weather in Stornoway:</p>',
		Aberdeen: '<h2>Aberdeen</h2><p>Weather in Aberdeen:</p>',
		Glasgow: '<h2>Glasgow</h2><p>Weather in Shetland:</p>',
		Inverness: '<h2>Inverness</h2><p>Weather in Inverness:</p>',
		Newcastle: '<h2>Newcastle</h2><p>Weather in Newcastle:</p>',
		Belfast: '<h2>Belfast</h2><p>Weather in Belfast:</p>',
		Hull: '<h2>Hull</h2><p>Weather in Hull:</p>',
		Dublin: '<h2>Dublin</h2><p>Weather in Dublin:</p>',
		Cork: '<h2>Cork</h2><p>Weather in Cork:</p>',
		Liverpool: '<h2>Liverpool</h2><p>Weather in Liverpool:</p>',
		IsleMan: '<h2>Isle of Man</h2><p>Weather in the Isle of Man:</p>'
    };

    const matches = Object.keys(locations).filter(loc =>
        loc.toLowerCase().startsWith(input)
    );

    matches.forEach(loc => {
        const div = document.createElement("div");
        div.className = "suggestion";

        const text = document.createElement("span");
        text.textContent = loc;

        const img = document.createElement("img");
        img.src = locations[loc];
        img.alt = loc + " icon";
        img.className = "suggestion-image";

        div.appendChild(text);
        div.appendChild(img);

        div.onclick = () => {
            window.location.href = "location.html?place=" + encodeURIComponent(loc);
        };

        box.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-dark');

    if (!toggle) {
        console.error('Toggle element not found!');
        return;
    }

    toggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode', toggle.checked);
    });
});

const previewContainer = document.getElementById('preview-container');
const preview = document.getElementById('preview');
const locations = document.querySelectorAll('.hoverBox');

const images = {
    London: 'images/london.png',
    Edinburgh: 'images/edinburgh.png',
    Cardiff: 'images/cardiff.png',
    Leeds: 'images/leeds.png',
    Bristol: 'images/bristol.png',
    Plymouth: 'images/plymouth.png',
    Belfast: 'images/belfast.png',
    Glasgow: 'images/glasgow.png',
    Inverness: 'images/inverness.png',
    Liverpool: 'images/liverpool.png',
    Birmingham: 'images/birmingham.png',
    Cork: 'images/cork.png',
    Dublin: 'images/dublin.png',
    Newcastle: 'images/newcastle.png',
    Hull: 'images/hull.png',
    Cambridge: 'images/cambridge.png',
    Lerwick: 'images/lerwick.png',
    Stornoway: 'images/stornoway.png',
    IsleMan: 'images/isleman.png',
    Nottingham: 'images/nottingham.png',
    Dover: 'images/dover.png'
};

locations.forEach(box => {
    box.addEventListener('mouseenter', () => {
        const name = box.textContent.trim();
        if (images[name]) preview.src = images[name];
        previewContainer.style.display = 'block';
    });

    box.addEventListener('mouseleave', () => {
        previewContainer.style.display = 'none';
    });
});
