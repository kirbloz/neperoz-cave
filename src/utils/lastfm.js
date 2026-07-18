// this script is under the MIT license (https://max.nekoweb.org/resources/license.txt)

const USERNAME = "kirbloz";
const API_KEY = "3b2784d0c5ca673c1537f474022dcc05";
const BASE_URL = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

const getTrack = async () => {
  try {
    const request = await fetch(BASE_URL);
    if (!request.ok) return; // gestisce errori HTTP senza crashare

    const json = await request.json();
    const track = json?.recenttracks?.track?.[0];

    if (!track) return;

    const isPlaying = track["@attr"]?.nowplaying === "true";

    const prefix = isPlaying
      ? ""
      : `<p >Nothing playing rn. Last piece was:</p>`;

    // COVER IMAGE: track.image[2]['#text'] (large) o track.image[3]['#text'] (extralarge)
    // TITLE: track.name
    // ARTIST: track.artist['#text']

    document.getElementById("listening").innerHTML = `
    ${prefix}
      <img src="${track.image[2]["#text"]}">
      <div id="trackInfo">
        <h3 id="trackName">${track.name}</h3>
        <p id="artistName">${track.artist["#text"]}</p>
      </div>
    `;
  } catch (err) {
    console.warn("Last.fm fetch failed:", err);
  }
};

getTrack();
setInterval(() => {
  getTrack();
}, 10000);
