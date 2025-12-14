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
        Plymouth: "images/plymouth.png"
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
