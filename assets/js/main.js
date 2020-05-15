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

function reset() {
  clearInterval(theSong);
}

function teach(song) {
  let gamelengthindex = 0;
  while (gamelengthindex < song.length) {
    let i = 0; //index
    let sso = song[i].substr(0, 1);
    //ssnote = Song String Note
    let ssnote = song[i].substr(1, 2);
    Synth.play(0, ssnote, sso, 2);
    let songID = document.getElementById(song[i]);
    songID.classList.add("active-comp");
    setTimeout(function () {
      $(songID).removeClass("active-comp");
    }, 500);

    $(songID).click(function (event) {
      // Don't follow the link
      event.preventDefault();

      // Log the clicked element in the console
      i++;
      let sso = song[i].substr(0, 1);
      //ssnote = Song String Note
      let ssnote = song[i].substr(1, 2);
      Synth.play(0, ssnote, sso, 2);
      let songID = document.getElementById(song[i]);
      songID.classList.add("active-comp");
      setTimeout(function () {
        $(songID).removeClass("active-comp");
      }, 500);
      console.log(event.target);
    });
  }
}
