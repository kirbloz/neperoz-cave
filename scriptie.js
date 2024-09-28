/*document.addEventListener("DOMContentLoaded", function () {
	var LASTFMUSER = "sep7ic";
	var url =
		"http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
		LASTFMUSER +
		"&api_key=afc213709a996ae561e307f596c9952b&format=json";

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			var artist = data.recenttracks.track[0].artist["#text"];
			var song = data.recenttracks.track[0]["name"];
			var artwork = data.recenttracks.track[0].image[3]["#text"];
			var link = data.recenttracks.track[0]["url"];

			document.getElementById("artwork").src = artwork;
			document.getElementById("track").innerHTML =
				" " + song + " " + artist;
			document.getElementById("artworklink").href = link;

			if (typeof data.recenttracks.track[0]["@attr"] !== "undefined") {
				document.getElementById("listen").innerHTML = "listening to:";
				console.log("true");
				document.getElementById("status").innerHTML = "online";
			} else {
				document.getElementById("listen").innerHTML =
					"last listened to:";
				console.log("false");
			}
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
});
*/

var lastfmData = {
	baseURL:
		"https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
	// Your Last.fm Username
	user: "kirbloz",
	// Your API key
	api_key: "37504bca44d7a7a69b67cee6b7f71f6b",
	additional: "&format=json&limit=1",
};

var getSetLastFM = function () {
	var LASTFMUSER = "kirbloz";
	var url =
		"http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" +
		LASTFMUSER +
		"&api_key=37504bca44d7a7a69b67cee6b7f71f6b&format=json&limit=1";

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			var artist = data.recenttracks.track[0].artist["#text"];
			var song = data.recenttracks.track[0]["name"];
			var artwork = data.recenttracks.track[0].image[3]["#text"];
			var link = data.recenttracks.track[0]["url"];

			document.getElementById("artwork").src = artwork;
			document.getElementById("track").innerHTML =
				" " + song + " " + artist;
			document.getElementById("artworklink").href = link;

			if (typeof data.recenttracks.track[0]["@attr"] !== "undefined") {
				document.getElementById("listen").innerHTML = "listening to:";
				console.log("true");
				document.getElementById("status").innerHTML = "online";
			} else {
				document.getElementById("listen").innerHTML =
					"last listened to:";
				console.log("false");
			}
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
};

/*
var getSetLastFM = function () {
	$.ajax({
		type: "GET",
		url:
			lastfmData.baseURL +
			lastfmData.user +
			"&api_key=" +
			lastfmData.api_key +
			lastfmData.additional,
		dataType: "json",
		success: function (resp) {
			var recentTrack = resp.recenttracks.track[0];
			var formatted =
				"<img src='https://i.imgur.com/EgWjJry.png'>" +
				recentTrack.name;
			$("a#tracktitle")
				.html(formatted)
				.attr("href", recentTrack.url)
				.attr(
					"title",
					recentTrack.name + " by " + recentTrack.artist["#text"]
				)
				.attr("target", "_blank");

			var artistFormatted =
				"<img src='https://i.imgur.com/fae5XZA.png'>" +
				recentTrack.artist["#text"];
			$("a#trackartist")
				.html(artistFormatted)
				.attr("title", "Artist : " + recentTrack.artist["#text"]);
			$("img#trackart").attr("src", recentTrack.image[2]["#text"]);
		},
		error: function (resp) {
			$("a#tracktitle").html(
				"<img src='https://i.imgur.com/EgWjJry.png'>" + "Silence!"
			);
			$("img#trackart").attr("src", "https://i.imgur.com/Q6cCswP.jpg");
			var artistFormatted =
				"<img src='https://i.imgur.com/fae5XZA.png'>Prashant Shrestha";
			$("a#trackartist")
				.html(artistFormatted)
				.attr("href", "www.prashant.me/");
		},
	});
};
*/
// Get the new one.
getSetLastFM();
// Start the countdown.
setInterval(getSetLastFM, 10 * 1000);

/*

<script>
var lastfmJsonURL = {
    baseURL: "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
    user: "four-caddit",
    api_key: "588f6fd035c099de6074afab2e81b6f1",
    additional: "&format=json&limit=1"
};

function shortenString(str, length) {
    if (str.length > length) {
        let shortenedStr = str.substring(0, length - 3);
        shortenedStr = shortenedStr.substr(0, Math.min(shortenedStr.length, shortenedStr.lastIndexOf(" ")));
        return shortenedStr + '...';
    } else {
        return str;
    }
}

// Construct JSON URL
var lastfmData = function () {
    $.ajax({
        type: "GET",
        url:
            lastfmJsonURL.baseURL +
            lastfmJsonURL.user +
            "&api_key=" +
            lastfmJsonURL.api_key +
            lastfmJsonURL.additional,
        dataType: "json",

        success: function (data) {
            // Reset info (prevents old info from persisting when current entries are blank)
            $("#tracktitle").html("");
            $("#trackartist").html("");
            $("div#playstatus").html("");

            // Check if 'nowplaying' exists in Last.fm JSON
            if (data.recenttracks.track[0]["@attr"] && data.recenttracks.track[0]["@attr"].nowplaying === "true") {
                // Show LIVE badge instead of date & time when nowplaying exists
                var playStatusHtml = "<span style='display:block; background-image: linear-gradient(to top right,#800000,red); color:#ccc; width:32px; font-weight:bold; line-height:12px; font-size:12px; padding:2px; margin-top:2px; border-radius: 12px 12px 12px; margin-left:-10px; margin-right:-10px'>LIVE</span>";

                // Pull remaining track info from Last.fm JSON
                var trackFormatted = shortenString(data.recenttracks.track[0].name, 70);
                var artistFormatted = data.recenttracks.track[0].artist["#text"];
                var coverArt = data.recenttracks.track[0].image[2]["#text"];
                var trackLink = data.recenttracks.track[0].url;

            } else {
                // Handle case when no song is playing
                var trackFormatted = "";
                var artistFormatted = "not playing";
                var playStatusHtml = "<span style='display:block; background-image: linear-gradient(to top right,black,gray); color:ccc; width:52px; font-weight:bold; line-height:12px; font-size:12px; padding:2px; margin-top:2px; border-radius: 12px 12px 12px; margin-left:-10px; margin-right:-10px'>OFFLINE</span><br>view all scrobbling history at last.fm/user/four-caddit"; 
                var coverArt = "media/index/maybearhino.png";  // Default cover art
                var trackLink = "https://www.last.fm/user/four-caddit"; // No link
            }

            // Update HTML with the latest info from Last.fm
            $("img#trackart").attr("src", coverArt);
            $("a#trackart").attr("href", trackLink);
            $("div#tracktitle").html(trackFormatted);
            $("div#trackartist").html(artistFormatted);
            $("div#playstatus").html(playStatusHtml);

        }, // End of AJAX success function

        error: function () {  // Show error message if Last.fm is down or wrong Last.fm username/API entered 
            console.log("Error fetching Last.fm data.");
            const ErrorCoverartURL = "media/index/notarhino.jpg";
            $("img#trackart").attr("src", ErrorCoverartURL);
            $("a#trackart").attr("href", "#");
            $("div#tracktitle").html("");
            $("div#trackartist").html("No Data");
            $("div#playstatus").html("<span style='display:block; background-image: linear-gradient(to top right,red,orange); color:ccc; width:60px; font-weight:bold; line-height:12px; font-size:12px; padding:2px; margin-top:2px; border-radius: 12px 12px 12px; margin-left:-10px; margin-right:-10px'>ERROR ⚠️</span><br>Check Last.fm status at twitter.com/lastfmstatus");
        }

    });

}

// Call the function to fetch & populate initial Last.fm dataset
lastfmData();

// Refresh every 15 seconds
setInterval(lastfmData, 15 * 1000);
</script>


<div id="lastfmcontainer" style="display:inline-block;">
  <div style="display:inline-block; width:100px; float:left;">
    <a href="https://www.last.fm/user/four-caddit" id="trackart"><img decoding="async" id="trackart" src="media/index/maybearhino.png" style="width:100%;"></a>
  </div>
  <div style="display:inline-block; width:180px; float:left; padding-left:10px;">
    <div id="tracktitle" style="font-size:17px; line-height:1em; margin-bottom:5px;"></div>
    <div id="trackartist" style="font-size:0.8em; line-height:1em; margin-bottom:5px; padding-top:5px;">not playing</div>
    <div id="playstatus" style="font-size:0.8em; line-height:1em; margin-bottom:5px; padding-top:5px;"><span style="display:block; background-image: linear-gradient(to top right,black,gray); color:ccc; width:52px; font-weight:bold; line-height:12px; font-size:12px; padding:2px; margin-top:2px; border-radius: 12px 12px 12px; margin-left:-10px; margin-right:-10px">OFFLINE</span><br>view all scrobbling history at last.fm/user/four-caddit</div>
  </div>
</div>

*/
