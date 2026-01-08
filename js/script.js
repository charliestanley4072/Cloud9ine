// -----------------------------
// INDEX.JS — for index.html only
// -----------------------------

function showSuggestions() {
    const input = document.getElementById("search").value.toLowerCase();
    const box = document.getElementById("suggestions");

    box.innerHTML = "";
    if (!input) return;

    const locations = {
        london: "images/london-thumbnail.png",
        edinburgh: "images/edinburgh-thumbnail.png",
        cardiff: "images/cardiff-thumbnail.png",
        leeds: "images/leeds-thumbnail.png",
        bristol: "images/bristol-thumbnail.png",
        plymouth: "images/plymouth-thumbnail.png",
        lerwick: "images/lerwick-thumbnail.png",
        stornoway: "images/stornoway-thumbnail.png",
        aberdeen: "images/aberdeen-thumbnail.png",
        glasgow: "images/glasgow-thumbnail.png",
        inverness: "images/inverness-thumbnail.png",
        newcastle: "images/newcastle-thumbnail.png",
        belfast: "images/belfast-thumbnail.png",
        hull: "images/hull-thumbnail.png",
        dublin: "images/dublin-thumbnail.png",
        cork: "images/cork-thumbnail.png",
        liverpool: "images/liverpool-thumbnail.png",
        isle_of_man: "images/isleofman-thumbnail.png",
		nottingham: "images/nottingham-thumbnail.png",
		dover: "images/dover-thumbnail.png",
		cambridge: "images/cambridge-thumbnail.png",
		norwich: "images/norwich-thumbnail.png", // Last main location
		harpenden: "images/harpenden-thumbnail.png",
		luton: "images/luton-thumbnail.png",
		st_albans: "images/stalbans-thumbnail.png",
		redbourn: "images/redbourn-thumbnail.png",
		hathersage: "images/hathersage-thumbnail.png",
		manchester: "images/manchester-thumbnail.png",
		ware: "images/ware-thumbnail.png",
		sheffield: "images/sheffield-thumbnail.png",
		doncaster: "images/doncaster-thumbnail.png",
		thorne: "images/thorne-thumbnail.png",
		blackpool: "images/blackpool-thumbnail.png",
		brighton: "images/brighton-thumbnail.png",
		cromer: "images/cromer-thumbnail.png",
		hunstanton: "images/hunstanton-thumbnail.png",
		holt: "images/holt-thumbnail.png",
		sherringham: "images/sherringham-thumbnail.png",
		cornwall: "images/cornwall-thumbnail.png",
		devon: "images/devon-thumbnail.png",
		great_yarmouth: "images/great_yarmouth-thumbnail.png",
		weybourne: "images/weybourne-thumbnail.png",
		milton_keynes: "images/milton_keynes-thumbnail.png",
		dunstable: "images/dunstable-thumbnail.png",
		hatfield: "images/hatfield-thumbnail.png",
		welwyn_garden_city: "images/welwyn_garden_city-thumbnail.png",
		radlett: "images/radlett-thumbnail.png",
		london_colney: "images/london_colney-thumbnail.png",
		hendon: "images/hendon-thumbnail.png",
		hemel_hempstead: "images/hemel_hempstead-thumbnail.png",
		
    };

    /* ---------- NORMAL LOCATION MATCHES ---------- */
    const matches = Object.keys(locations).filter(loc =>
        loc.toLowerCase().startsWith(input)
    );

    matches.forEach(loc => {
        const div = document.createElement("div");
        div.className = "suggestion";

        const text = document.createElement("span");
        text.textContent = loc.replace(/_/g, ' ');

        const img = document.createElement("img");
        img.src = locations[loc];
        img.alt = loc + " icon";
        img.className = "suggestion-image";

        div.appendChild(text);
        div.appendChild(img);

        div.onclick = () => {
            window.location.href =
                "location.html?place=" + encodeURIComponent(loc);
        };

        box.appendChild(div);
    });

    /* ---------- SECRET CODE ---------- */
    const SECRET_CODE = "675353"; // change this to your code

    if (input === SECRET_CODE) {
        const secretDiv = document.createElement("div");
        secretDiv.className = "suggestion";

        const secretText = document.createElement("span");
        secretText.textContent = "Midwich";

        const secretImg = document.createElement("img");
        secretImg.src = "images/midwich-thumbnail.png"; // optional icon
        secretImg.className = "suggestion-image";

        secretDiv.appendChild(secretText);
        secretDiv.appendChild(secretImg);

        secretDiv.onclick = () => {
            window.location.href = "location.html?place=Midwich";
        };

        box.appendChild(secretDiv);
    }
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
    london: 'images/london.png',
    edinburgh: 'images/edinburgh.png',
    cardiff: 'images/cardiff.png',
    leeds: 'images/leeds.png',
    bristol: 'images/bristol.png',
    plymouth: 'images/plymouth.png',
    belfast: 'images/belfast.png',
    glasgow: 'images/glasgow.png',
    inverness: 'images/inverness.png',
    liverpool: 'images/liverpool.png',
    birmingham: 'images/birmingham.png',
    cork: 'images/cork.png',
    dublin: 'images/dublin.png',
    newcastle: 'images/newcastle.png',
    hull: 'images/hull.png',
    lerwick: 'images/lerwick.png',
    stornoway: 'images/stornoway.png',
    isleofman: 'images/isleofman.png',
    nottingham: 'images/nottingham.png',
    dover: 'images/dover.png',
	cambridge: 'images/cambridge.png',
	aberdeen: 'images/aberdeen.png',
	norwich: 'images/norwich.png',
};

locations.forEach(box => {
    box.addEventListener('mouseenter', () => {
        const name = box.id.replace("hoverBox-", "").toLowerCase();
        if (images[name]) preview.src = images[name];
        previewContainer.style.display = 'block';
    });

    box.addEventListener('mouseleave', () => {
        previewContainer.style.display = 'none';
    });
});
