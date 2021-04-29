let track_list = [
  {
    name: "Ukulele",
    artist: "Broke For Free",
    image: "Image URL",
    path: "./src/music-player_music_ukulele.mp3",
  },
  {
    name: "Summer",
    artist: "Tours",
    image: "Image URL",
    path: "./src/music-player_music_summer.mp3",
  },
  {
    name: "Hey",
    artist: "Chad Crouch",
    image: "Image URL",
    path: "./src/music-player_music_hey.mp3",
  },
];

let counterPlaying = document.querySelector(".now-playing");
let trackNamePlaying = document.querySelector(".track-name");
let trackArtistPlaying = document.querySelector(".track-artist");
let prevBtn = document.querySelector(".prev-track");
let nextBtn = document.querySelector(".next-track");
let playPause = document.querySelector(".playpause-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let currentTrack = document.createElement("audio");
let track_index = 0;

loadTrack(track_index);

function loadTrack(track_index) {
  currentTrack.src = track_list[track_index].path;
  trackNamePlaying.textContent = track_list[track_index].name;
  trackArtistPlaying.textContent = track_list[track_index].artist;
  counterPlaying.innerHTML = `PLAYING ${track_index + 1} OF ${
    track_list.length
  }`;
  currentTrack.addEventListener("ended", nextTrack);
  updateTimer = setInterval(seekUpdate, 1000);

  seek_slider.value = currentTrack.currentTime * (100 / currentTrack.duration);
  currentTrack.load();
  //   clearInterval(updateTimer);
  //   resetValues();
}
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function playpauseTrack() {
  if (currentTrack.paused) {
    currentTrack.play();
    playPause.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  } else {
    currentTrack.pause();

    playPause.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
}

function prevTrack() {
  console.log("prev");
  if (track_index > 0) {
    track_index -= 1;
  } else {
    track_index = track_list.length - 1;
  }

  loadTrack(track_index);
  playpauseTrack();
}

function nextTrack() {
  if (track_index === track_list.length - 1) {
    track_index = 0;
  } else {
    track_index += 1;
  }

  loadTrack(track_index);
  playpauseTrack();
}

function seekTo() {
  let seekto = currentTrack.duration * (seek_slider.value / 100);
  currentTrack.currentTime = seekto;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seek_slider.value = seekPosition;
    // Calculate the time left and the total duration
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );
    // Add a zero to the single digit time values
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }
    // Display the updated duration
    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}
function setVolume() {
  currentTrack.volume = volume_slider.value / 100;
}
