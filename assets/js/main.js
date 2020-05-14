/*--------------Piano js code  */
const keys = document.querySelectorAll(".key");

keys.forEach((key) => {
  key.addEventListener("mousedown", () =>
    Synth.play(0, key.id.substr(1, 3), key.id.substr(0, 1), 2)
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

function playSong(song) {
  let time = 0; //Time between notes reset
  for (let i = 0; i < song.length; i++) {
    //sso = Song String Octave
    let sso = song[i].substr(0, 1);
    //ssnote = Song String Note
    let ssnote = song[i].substr(1, 3);
    time = time + 600; //add time between notes
    setTimeout(() => {
      Synth.play(0, ssnote, sso, 2);
    }, time);
  }
  time = 0;
}

