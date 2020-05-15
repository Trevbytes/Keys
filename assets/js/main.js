/*--------------Piano js code  */
const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("mousedown", () =>
    Synth.play(0, key.id.substr(1, 2), key.id.substr(0, 1), 2)
  );
});

/*--Adding and removing active class to piano keys.  --*/
for (let i = 0; i < keys.length; i++) {
  // Add 'open' class on mouseover
  keys[i].addEventListener("mousedown", function () {
    this.classList.add("active");
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

// function addActiveClass(){

// };
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
        //sso = Song String Octave
        let sso = song[i].substr(0, 1);
        //ssnote = Song String Note
        let ssnote = song[i].substr(1, 2);
        Synth.play(0, ssnote, sso, 2);

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
        //sso = Song String Octave
        let sso = song[i].substr(0, 1);
        //ssnote = Song String Note
        let ssnote = song[i].substr(1, 2);

        Synth.play(0, ssnote, sso, 2);

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

function teach(song) {
  let gameLengthIndex = 0;
  let playerInput = [];
  let teachOn = true;

  Synth.play(
    0,
    song[gameLengthIndex].substr(1, 2),
    song[gameLengthIndex].substr(0, 1),
    2
  );

  let noteID = document.getElementById(song[gameLengthIndex]);
  noteID.classList.add("active-comp");
  setTimeout(function () {
    noteID.classList.remove("active-comp");
  }, 500);

  $(".t").click(function (event) {
    if (teachOn === true) {
      console.log(event.target.id);
      playerInput.push(event.target.id);
      // Log the clicked element in the console
      Synth.play(
        0,
        event.target.id.substr(1, 2),
        event.target.id.substr(0, 1),
        2
      );

      noteID = document.getElementById(song[gameLengthIndex]);
      noteID.classList.add("active");
      setTimeout(function () {
        event.target.classList.remove("active");
      }, 500);
      console.log("finished first key");

      var teachSong = setInterval(function () {
        if (playerInput.length === song.length) {
          clearInterval(teach);
          console.log("input=song length");
        }
        if (playerInput[gameLengthIndex] === song[gameLengthIndex]) {
          if (playerInput.length !== song.length) {
            gameLengthIndex++;
            Synth.play(
              0,
              song[gameLengthIndex].substr(1, 2),
              song[gameLengthIndex].substr(0, 1),
              2
            );
            console.log("increase index and play note comp");

            noteID = document.getElementById(song[gameLengthIndex]);
            noteID.classList.add("active-comp");
            setTimeout(function () {
              noteID.classList.remove("active-comp");
            }, 500);
          } else {
            clearInterval(teachSong);
            teachOn=false;
            console.log("clear interval player input = song.length");
          }
        } else if (playerInput[gameLengthIndex] === undefined) {
          Synth.play(
            0,
            song[gameLengthIndex].substr(1, 2),
            song[gameLengthIndex].substr(0, 1),
            2
          );
          console.log("repeat key");
          console.log(playerInput.toString());
          console.log(noteID);
          noteID = document.getElementById(song[gameLengthIndex]);
          noteID.classList.add("active-comp");
          setTimeout(function () {
            noteID.classList.remove("active-comp");
          }, 500);
        } else {
          playerInput.pop();
          Synth.play(
            0,
            song[gameLengthIndex].substr(1, 2),
            song[gameLengthIndex].substr(0, 1),
            2
          );
          console.log("wrong input");
          console.log(playerInput.toString());
          noteID = document.getElementById(song[gameLengthIndex]);
          noteID.classList.add("active-comp");
          setTimeout(function () {
            noteID.classList.remove("active-comp");
          }, 500);
        }
      }, 1000);
    }else{return;}
  });
}

function reset() {
  clearInterval(theSong);
  clearInterval(teachSong);
  removeClick();
}

function removeClick() {
  $(".t").removeEventListener("click");
}
