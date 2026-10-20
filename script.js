
const video = document.querySelector("video");
const wrapper = document.querySelector(".wrapper");

// Set the required video source
video.src = "https://www.w3schools.com/html/mov_bbb.mp4";
video.controls = false;

// Create custom player controls
const controls = document.createElement("div");
controls.className = "controls";

controls.innerHTML = `
    <div class="progress">
        <div class="progress__filled"></div>
    </div>

    <button class="player__button toggle" type="button">►</button>

    <button class="rewind" type="button">« 10s</button>
    <button class="forward" type="button">25s »</button>

    <label>
        Volume
        <input type="range" name="volume" min="0" max="1"
               step="0.01" value="1">
    </label>

    <label>
        Speed
        <input type="range" name="playbackSpeed" min="0.5" max="2"
               step="0.25" value="1">
        <span class="speed-value">1×</span>
    </label>
`;

wrapper.insertBefore(controls, video.nextSibling);

const toggle = controls.querySelector(".toggle");
const progress = controls.querySelector(".progress");
const progressFilled = controls.querySelector(".progress__filled");
const volume = controls.querySelector('[name="volume"]');
const playbackSpeed = controls.querySelector('[name="playbackSpeed"]');
const speedValue = controls.querySelector(".speed-value");

// Play and pause
toggle.addEventListener("click", function () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});

video.addEventListener("play", function () {
    toggle.textContent = "❚ ❚";
});

video.addEventListener("pause", function () {
    toggle.textContent = "►";
});

// Update progress bar
video.addEventListener("timeupdate", function () {
    if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressFilled.style.width = percentage + "%";
    }
});

// Seek by clicking the progress bar
progress.addEventListener("click", function (event) {
    if (video.duration) {
        const rect = progress.getBoundingClientRect();
        const position = (event.clientX - rect.left) / rect.width;

        video.currentTime = position * video.duration;
    }
});

// Control volume
volume.addEventListener("input", function () {
    video.volume = Number(this.value);
});

// Control playback speed
playbackSpeed.addEventListener("input", function () {
    video.playbackRate = Number(this.value);
    speedValue.textContent = this.value + "×";
});

// Rewind 10 seconds
controls.querySelector(".rewind").addEventListener("click", function () {
    video.currentTime = Math.max(0, video.currentTime - 10);
});

// Skip forward 25 seconds
controls.querySelector(".forward").addEventListener("click", function () {
    if (Number.isFinite(video.duration)) {
        video.currentTime = Math.min(
            video.duration,
            video.currentTime + 25
        );
    }
});
