/*--------------Piano js code  */
const keys = document.querySelectorAll(".key");
var lastPlayedKey;

/*--Adding event lister for mouse down as well as adding and removing active class to piano keys.  --*/
for (let i = 0; i < keys.length; i++) {
  // Add 'open' class on mouseover
  keys[i].addEventListener("mousedown", function () {
    this.classList.add("active");
    Synth.play(0, keys[i].id.substr(1, 2), keys[i].id.substr(0, 1), 2);
    lastPlayedKey = this.id;
  });

  // Remove 'open" class with a delay after mouseup
  keys[i].addEventListener("mouseup", function () {
    let node = this; // Allow access to 'this' in a timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
  // Remove 'open" class with a delay after mouseout
  keys[i].addEventListener("mouseout", function () {
    let node = this; // Allow access to 'this' in a timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
}

/*--Happy Birday song --*/

var happyBirthdaySong = [
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
];
var theSong;
function playSong(song) {
  let i = 0; //index
  //if a song not playing
  if (theSong === undefined) {
    theSong = setInterval(function () {
      if (i === song.length) {
        clearInterval(theSong);
      } else {
        Synth.play(0, song[i].substr(1, 2), song[i].substr(0, 1), 2);

        let songID = document.getElementById(song[i]);
        songID.classList.add("active-comp");
        setTimeout(function () {
          $(songID).removeClass("active-comp");
        }, 300);

        i++;
      }
    }, 600);
    //if a song is playing
  } else {
    clearInterval(theSong);
    theSong = setInterval(function () {
      if (i === song.length) {
        clearInterval(theSong);
      } else {
        Synth.play(0, song[i].substr(1, 2), song[i].substr(0, 1), 2);

        let songID = document.getElementById(song[i]);
        songID.classList.add("active-comp");
        setTimeout(function () {
          $(songID).removeClass("active-comp");
        }, 300);

        i++;
      }
    }, 600);
  }
}

var teachSong;
var teachOn;
var gameLengthIndex;
var playerInput;
function teach(song) {
  reset();
  gameLengthIndex = 0;
  playerInput = [];
  teachOn = true;
  lastPlayedKey = undefined;

  //   Synth.play(
  //     0,
  //     song[gameLengthIndex].substr(1, 2),
  //     song[gameLengthIndex].substr(0, 1),
  //     2
  //   );

  if (teachSong === undefined && teachOn) {
      
    let noteID = document.getElementById(song[gameLengthIndex]);
    noteID.classList.add("active-comp");
    setTimeout(function () {
      noteID.classList.remove("active-comp");
    }, 500);

    teachSong = setInterval(function () {
      playerInput.push(lastPlayedKey);
      if (playerInput.length === song.length) {
        clearInterval(teach);
      }
      if (playerInput[gameLengthIndex] === song[gameLengthIndex]) {
        if (playerInput.length !== song.length) {
          gameLengthIndex++;
          //   Synth.play(
          //     0,
          //     song[gameLengthIndex].substr(1, 2),
          //     song[gameLengthIndex].substr(0, 1),
          //     2
          //   );
          noteID = document.getElementById(song[gameLengthIndex]);
          noteID.classList.add("active-comp");
          setTimeout(function () {
            noteID.classList.remove("active-comp");
          }, 500);
        } else {
          teachOn = false;
          playerInput = [];
          clearInterval(teachSong);
          teachSong = undefined;
        }
      } else if (playerInput[gameLengthIndex] === undefined) {
        // Synth.play(
        //   0,
        //   song[gameLengthIndex].substr(1, 2),
        //   song[gameLengthIndex].substr(0, 1),
        //   2
        // );
        noteID = document.getElementById(song[gameLengthIndex]);
        noteID.classList.add("active-comp");
        setTimeout(function () {
          noteID.classList.remove("active-comp");
        }, 500);
      } else {
        playerInput.pop();
        // Synth.play(
        //   0,
        //   song[gameLengthIndex].substr(1, 2),
        //   song[gameLengthIndex].substr(0, 1),
        //   2
        // );
        noteID = document.getElementById(song[gameLengthIndex]);
        noteID.classList.add("active-comp");
        setTimeout(function () {
          noteID.classList.remove("active-comp");
        }, 500);
      }
    }, 1500);
  }
}

function reset() {
  clearInterval(theSong);
  clearInterval(teachSong);
  teachSong = undefined;
  playerInput = [];
  gameLengthIndex = 0;
  teachOn = false;
  playerInput = [];
}

function changeActiveSong(name, song) {
  console.log(song);
  if (name === "Free Play") {
    $(".active-song").html(` ${name} `);
    $(".active-song").attr("onclick", `playSong(${song})`);
    $(".active-teach").attr("onclick", `teach(${song})`);
  } else {
    $(".active-song").html(
      `<i class="fas fa-music"></i> ${name} <i class="fas fa-music"></i>`
    );
    $(".active-song").attr("onclick", `playSong(${song})`);
    $(".active-teach").attr("onclick", `teach(${song})`);
  }
}

var itzyBitzySpiderSong = [];
var theWheelsOnTheBusSong = [];
var freePlay = [];
