const keys = document.querySelectorAll(".key");
var lastPlayedKey;
var playingSong;
var teachSong;
var teachOn;
var gameLengthIndex = 0;
var playerInput;
/*-- Songs --*/
const happyBirthdaySong = [
    "4C",
    "4C",
    "4D",
    "4C",
    "4F",
    "4E",
    "4C",
    "4C",
    "4D",
    "4C",
    "4G",
    "4F",
    "4C",
    "4C",
    "5C",
    "4A",
    "4F",
    "4E",
    "4D",
    "4A#",
    "4A#",
    "4A",
    "4F",
    "4G",
    "4F",
  ],
  itzyBitzySpiderSong = [
    "3G",
    "4C",
    "4C",
    "4C",
    "4D",
    "4E",
    "4E",
    "4E",
    "4D",
    "4C",
    "4D",
    "4E",
    "4C",
    "4E",
    "4E",
    "4F",
    "4G",
    "4G",
    "4F",
    "4E",
    "4F",
    "4G",
    "4E",
    "4C",
    "4C",
    "4D",
    "4E",
    "4E",
    "4D",
    "4C",
    "4D",
    "4E",
    "4C",
    "3G",
    "3G",
    "4C",
    "4C",
    "4C",
    "4D",
    "4E",
    "4E",
    "4E",
    "4D",
    "4C",
    "4D",
    "4E",
    "4C",
  ],
  theWheelsOnTheBusSong = [
    "4D",
    "4G",
    "4G",
    "4G",
    "4G",
    "4B",
    "5D",
    "4B",
    "4G",
    "4A",
    "4F#",
    "4D",
    "5D",
    "4B",
    "4G",
    "4D",
    "4G",
    "4G",
    "4G",
    "4G",
    "4B",
    "5D",
    "4B",
    "4G",
    "4A",
    "4D",
    "4D",
    "4G",
  ],
  freePlay = [];

/*--------------Piano js code  */
/*--Adding event lister for mouse down as well as adding and removing active class to piano keys.  --*/
for (let i = 0; i < keys.length; i++) {
  // Add 'active' class on mouseover
  keys[i].addEventListener("mousedown", function () {
    this.classList.add("active");
    Synth.play(0, keys[i].id.substr(1, 2), keys[i].id.substr(0, 1), 2);
    lastPlayedKey = this.id;
  });

  // Remove 'active' class with a delay after mouseup
  keys[i].addEventListener("mouseup", function () {
    let node = this; // Allow access to 'this' in a timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
  // Remove 'active' class with a delay after mouseout
  keys[i].addEventListener("mouseout", function () {
    let node = this; // Allow access to 'this' in a timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
}

function addComputerActive(keyID) {
  keyID.classList.add("active-comp");
  setTimeout(function () {
    $(keyID).removeClass("active-comp");
  }, 300);
}

function addComputerTeachActive(keyID) {
  keyID.classList.add("active-comp");
  setTimeout(function () {
    $(keyID).removeClass("active-comp");
  }, 500);
}

function playSong(song) {
  reset();
  enableStop();
  let i = 0; //index
  //if a song not playing
  if (playingSong === undefined) {
    playingSong = setInterval(function () {
      if (i === song.length) {
        clearInterval(playingSong);
      } else {
        Synth.play(0, song[i].substr(1, 2), song[i].substr(0, 1), 2);
        let keyID = document.getElementById(song[i]);
        addComputerActive(keyID);
        i++;
      }
    }, 600);
    //if a song is playing
  } else {
    clearInterval(playingSong);
    playingSong = setInterval(function () {
      if (i === song.length) {
        clearInterval(playingSong);
      } else {
        Synth.play(0, song[i].substr(1, 2), song[i].substr(0, 1), 2);
        let keyID = document.getElementById(song[i]);
        addComputerActive(keyID);
        i++;
      }
    }, 600);
  }
}

function teach(song) {
  reset();
  enableStop();
  teachOn = true;
  lastPlayedKey = undefined;

  if (teachSong === undefined && teachOn) {
    let keyID = document.getElementById(song[gameLengthIndex]);
    addComputerTeachActive(keyID);

    teachSong = setInterval(function () {
      playerInput.push(lastPlayedKey);
      if (playerInput[gameLengthIndex] === song[gameLengthIndex]) {
        if (playerInput.length !== song.length) {
          gameLengthIndex++;
          keyID = document.getElementById(song[gameLengthIndex]);
          addComputerTeachActive(keyID);
        } else {
          reset();
        }
      } else {
        playerInput.pop();
        keyID = document.getElementById(song[gameLengthIndex]);
        addComputerTeachActive(keyID);
      }
    }, 1500);
  }
}

function reset() {
  clearInterval(playingSong);
  clearInterval(teachSong);
  teachSong = undefined;
  playerInput = [];
  gameLengthIndex = 0;
  teachOn = false;
  playerInput = [];
  disableStop();
}

function changeActiveSong(name, song) {
  reset();
  if (name === "Free Play") {
    $(".active-song").html(` ${name} `);
    $(".active-song").attr("onclick", `playSong(${song})`);
    $(".active-teach").attr("onclick", `teach(${song})`);
  } else {
    $(".active-song").html(
      `<i class="fas fa-play text-dark">  </i><i class="fas fa-music"></i> ${name} <i class="fas fa-music"></i>`
    );
    $(".active-song").attr("onclick", `playSong(${song})`);
    $(".active-teach").attr("onclick", `teach(${song})`);
  }
}

function enableStop() {
  $("#stop-button").attr("disabled", false);
  $("#stop-button").attr("aria-disabled", "false");
  $("#stop-button").attr("tabindex", "1");
}

function disableStop() {
  $("#stop-button").attr("disabled", true);
  $("#stop-button").attr("aria-disabled", "true");
  $("#stop-button").attr("tabindex", "-1");
}
