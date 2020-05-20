/*------------- Variables -----------------*/
const keys = document.querySelectorAll(".key");
let lastPlayedKey,
  playingSong,
  teachSong,
  teachOn,
  teachLengthIndex = 0,
  playerInput,
  instrument = 0,
  noteLength = 2,
  recordInput = [],
  windowHeight = window.matchMedia("(max-height: 308px)");
/*-- /Variables --*/
/*------------- Song Arrays -----------------*/
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
  ];
let playRecording = [];
/*-- /Song Arrays --*/
/*------------------------------- Runtime Events -------------------------------------*/
/*------------- Event Listeners -----------------*/

/*--Adding event listeners for mouse down as well as adding and removing active class to piano keys.  --*/
for (let i = 0; i < keys.length; i++) {
  // Add 'active' class on mousedown and play sound.
  keys[i].addEventListener("mousedown", function () {
    this.classList.add("active");
    //'if' pushes the note to an array if recording is on.
    if (recording()) recordNote(keys[i].id);
    // 'Synth' is using the AudioSynth file by Keith William Horwood https://github.com/keithwhor/audiosynth.
    // Synth.play takes 4 inputs; instrument, music note, octave, duration.
    Synth.play(
      instrument,
      keys[i].id.substr(1, 2),
      keys[i].id.substr(0, 1),
      noteLength
    );
    lastPlayedKey = this.id; //lastPlayedKey is used in the teach function.
  });

  // Remove 'active' class with a delay after mouseup
  keys[i].addEventListener("mouseup", function () {
    let node = this;
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
  // Remove 'active' class with a delay after mouseout
  keys[i].addEventListener("mouseout", function () {
    let node = this;
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
}
windowHeight.addListener(footerFix); // Attaches listener function on state changes.
/*-- /Event Listeners --*/
footerFix(windowHeight);
$(".notetext").addClass("no-select");
$(".notetext-b").addClass("no-select");
notesOff();
hideRecord();
/*-- /Runtime Events --*/
/*------------------------------- Button Functions -------------------------------------*/

//Clears all intervals and relevent variables of all functions and disables the stop button.
function stopAll() {
  clearInterval(playingSong);
  clearInterval(teachSong);
  teachSong = undefined;
  playerInput = [];
  teachLengthIndex = 0;
  teachOn = false;
  disableStop();
}

//This function changes the active song by editing the html attributes with the variables passed to the function.
function changeActiveSong(name, song) {
  stopAll(); //stops any currently playing songs or teach functions.

  if (name === "Play Recording") {
    // Catches the "Play Recording" song
    $(".active-song").html(
      `<i class="fas fa-play text-dark">  </i><i class="fas fa-music hvr-icon"></i> ${name} <i class="fas fa-music hvr-icon"></i>`
    );
    $(".active-song").attr("onclick", `playSong(${song})`);
    $(".active-teach").attr("onclick", `teach(${song})`);
    if (playRecording[0] === undefined) {
      //if there is no song recorded this disables buttons to guide the user to the record button.
      disableTeach();
      disableActiveSong();
    }
    showRecord(); //shows the record button
  } else {
    $(".active-song").html(
      `<i class="fas fa-play text-dark">  </i><i class="fas fa-music hvr-icon"></i> ${name} <i class="fas fa-music hvr-icon"></i>`
    );
    $(".active-song").attr("onclick", `playSong(${song})`);
    $(".active-teach").attr("onclick", `teach(${song})`);
    hideRecord(); //hides record button on preset songs
  }
}

//This function is used to play back song arrays note by note
function playSong(song) {
  stopAll();
  enableStop();
  let i = 0; //index variable

  //if a song is not playing
  if (playingSong === undefined) {
    playingSong = setInterval(function () {
      //checks if the song is finished
      if (i === song.length) {
        stopAll();
      } else {
        Synth.play(
          instrument,
          song[i].substr(1, 2),
          song[i].substr(0, 1),
          noteLength
        );
        //adds active class to played key, with a timeout.
        let keyID = document.getElementById(song[i]);
        addComputerActive(keyID);
        i++;
      }
    }, 600);
    //if a song is playing
  } else {
    clearInterval(playingSong); //clears the interval in the above if statement
    playingSong = setInterval(function () {
      if (i === song.length) {
        stopAll();
      } else {
        Synth.play(
          instrument,
          song[i].substr(1, 2),
          song[i].substr(0, 1),
          noteLength
        );
        //adds active class to played key, with a timeout.
        let keyID = document.getElementById(song[i]);
        addComputerActive(keyID);
        i++;
      }
    }, 600);
  }
}

/*This function adds an active class to the first note in a song array.
If the users last key is the same as the shown key, the next note in
the array is shown. The next note is only shown when the correct key is pressed.
Otherwise the note is repeated. All player input is passed to an array. Only the
last stored item in the array is checked*/
function teach(song) {
  stopAll();
  enableStop();
  teachOn = true;//allows the teach function to work
  lastPlayedKey = undefined;//clears the lastPlayedKey.

  if (teachOn) {
      //shows first note
    let keyID = document.getElementById(song[teachLengthIndex]);
    addComputerTeachActive(keyID);

    teachSong = setInterval(function () {
      playerInput.push(lastPlayedKey);
      //if the input matches the current note in the song
      if (playerInput[teachLengthIndex] === song[teachLengthIndex]) {
          //if there is another note in the song
        if (playerInput.length !== song.length) {
          teachLengthIndex++;
          //shows next note
          keyID = document.getElementById(song[teachLengthIndex]);
          addComputerTeachActive(keyID);
          //end of song
        } else {
          stopAll();
        }
        //the input does not match the current note
      } else {
        playerInput.pop();//removes the wrong note in the playerInput array
        //repeats the current note
        keyID = document.getElementById(song[teachLengthIndex]);
        addComputerTeachActive(keyID);
      }
    }, 1500);
  }
}

/*----------------Recording functions----------------------- */

/*This function is called every time a key is clicked. If the recording
button has been activated the function runs the code. Otherwise nothing is
done. The function then checks if the recording button has been clicked.*/
function record() {
  if (recording()) {
    $("#record-btn")
      .removeClass("btn-danger active active-r")
      .addClass("btn-secondary");
    enableTeach();
    enableSongChoice();
    enableActiveSong();
  } else {
    $("#record-btn")
      .removeClass("btn-secondary")
      .addClass(" active-r active btn-danger");
    startRecording();
    disableTeach();
    disableSongChoice();
  }
}

//Checks that the record button has been clicked 
function recording() {
  return $("#record-btn").hasClass("active-r");
}

//Called to clear playRecording array and recordInput array
function startRecording() {
  recordInput = [];
  playRecording = [];
}

//function that pushes user input to recording array
function recordNote(keyID) {
  playRecording.push(keyID);
}
/*--/Recording Functions-- */

function switchInstrument(instrumentnum) {
  instrument = instrumentnum;
  if (instrumentnum === 1) {
    noteLength = 1;
  } else {
    noteLength = 2;
  }
}
/*-- /Button Functions --*/
/*------------- Jquery functions to enable/disable/hide/show elements -----------------*/
function addComputerActive(keyID) {
  $(keyID).addClass("active-comp");
  setTimeout(function () {
    $(keyID).removeClass("active-comp");
  }, 300);
}

function addComputerTeachActive(keyID) {
  $(keyID).addClass("active-comp");
  setTimeout(function () {
    $(keyID).removeClass("active-comp");
  }, 500);
}

function footerFix(x) {
  if (x.matches) {
    // If media query matches
    $(".footer-row").removeClass("fixed-bottom").addClass("absolute-bottom");
  } else {
    $(".footer-row").removeClass("absoulte-bottom").addClass("fixed-bottom");
  }
}

function enableStop() {
  $("#stop-button").attr("disabled", false);
  $("#stop-button").attr("tabindex", "1");
}

function disableStop() {
  $("#stop-button").attr("disabled", true);
  $("#stop-button").attr("tabindex", "-1");
}

function disableTeach() {
  $(".active-teach").attr("disabled", true);
  $(".active-teach").attr("tabindex", "-1");
}

function enableTeach() {
  $(".active-teach").attr("disabled", false);
  $(".active-teach").attr("aria-disabled", "false");
  $(".active-teach").attr("tabindex", "1");
}

function disableSongChoice() {
  $(".song-choice").attr("disabled", true);
  $(".song-choice").attr("aria-disabled", "true");
  $(".song-choice").attr("tabindex", "-1");
}

function enableSongChoice() {
  $(".song-choice").attr("disabled", false);
  $(".song-choice").attr("aria-disabled", "false");
  $(".song-choice").attr("tabindex", "1");
}

function disableActiveSong() {
  $(".active-song").attr("disabled", true);
  $(".active-song").attr("aria-disabled", "true");
  $(".active-song").attr("tabindex", "-1");
}

function enableActiveSong() {
  $(".active-song").attr("disabled", false);
  $(".active-song").attr("aria-disabled", "false");
  $(".active-song").attr("tabindex", "1");
}

function notesOn() {
  $(".notetext").show();
  $(".notetext-b").show();
}

function notesOff() {
  $(".notetext").hide();
  $(".notetext-b").hide();
}

function showRecord() {
  $("#record-btn").show();
  $("#record-btn").show();
}

function hideRecord() {
  $("#record-btn").hide();
  $("#record-btn").hide();
}

function hideInfoTablet() {
  $(".make-larger-info-tablet").addClass("collapse");
}
/*-- /Jquery functions --*/
