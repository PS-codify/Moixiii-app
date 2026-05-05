// =======================
// HOME PAGE (index.html)
// =======================

const startBtn = document.getElementById("startBtn");

if (startBtn) {
    startBtn.addEventListener("click", function () {

        // clear old data when starting fresh
        localStorage.removeItem("mood");
        localStorage.removeItem("vibe");

        window.location.href = "mood.html";
    });
}

// =======================
// BACK BUTTON
// =======================

const backBtn = document.getElementById("back-btn");

if (backBtn) {
    backBtn.addEventListener("click", function() {

        window.location.href = "index.html"
    });
}

// =======================
// MOOD PAGE (mood.html)
// =======================

const moodButtons = document.querySelectorAll(".mood");

if (moodButtons.length > 0) {
    moodButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const selectedMood = button.innerText;

            localStorage.setItem("mood", selectedMood);

            window.location.href = "vibe.html";
        });
    });
}


// =======================
// VIBE PAGE (vibe.html)
// =======================

const vibeButtons = document.querySelectorAll(".vibe");

if (vibeButtons.length > 0) {
    vibeButtons.forEach(function (button) {
        button.addEventListener("click", function () {

            const selectedVibe = button.innerText;

            localStorage.setItem("vibe", selectedVibe);

            window.location.href = "playlist.html";
        });
    });
}


// =======================
// PLAYLIST PAGE (playlist.html)
// =======================

const songsDiv = document.getElementById("songs");

if (songsDiv) {

    const mood = localStorage.getItem("mood");
    const vibe = localStorage.getItem("vibe");

    async function loadSongs() {

        // use vibe first, fallback to mood
        const query = encodeURIComponent(vibe || mood || "pop");

        const url = `https://itunes.apple.com/search?term=${query}&limit=12&entity=song`;

        try {
            const res = await fetch(url);
            const data = await res.json();

            songsDiv.innerHTML = "";

            data.results
                .filter(song => song.trackName && song.artistName)
                .forEach(song => {

                    const card = document.createElement("div");

                    card.innerHTML = `
                        <div class="song-card">
                            <img src="${song.artworkUrl100}" alt="cover">

                            <div class="song-info">
                                <p class="song-title">${song.trackName}</p>
                                <p class="song-artist">${song.artistName}</p>
                            </div>
                        </div>
                    `;

                    songsDiv.appendChild(card);
                });

        }   catch (error) {
            console.log("Error fetching songs:", error);
            songsDiv.innerHTML = "<p>Something went wrong 😢</p>";
        }
    }

    loadSongs();
}