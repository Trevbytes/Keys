
/*--------------Piano CSS code heavily influenced by a YouTube tutorial by Kyle.  https://www.youtube.com/watch?v=vjco5yKZpU8 */
const keys = document.querySelectorAll(".key");

keys.forEach(key => {
  key.addEventListener("click", () => playNote(key));
});

function playNote(key) {
  const noteAudio = "C";
  Synth.play(0, noteAudio, 4, 2);
//   key.classList.add("active");
//   noteAudio.addEventListener("ended", () => {
//     key.classList.remove("active");
//   });
console.log("Test");
}
