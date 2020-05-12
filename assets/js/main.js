
/*--------------Piano CSS code heavily influenced by a YouTube tutorial by Kyle.  https://www.youtube.com/watch?v=vjco5yKZpU8 */
const keys = $(".key");

keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

function playNote(key) {
  const noteAudio = "C";
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}
