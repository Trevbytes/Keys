/*--------------Piano CSS code heavily influenced by a YouTube tutorial by Kyle.  https://www.youtube.com/watch?v=vjco5yKZpU8 */
const keys3 = document.querySelectorAll(".key3");
const keys4 = document.querySelectorAll(".key4");
const keys5 = document.querySelectorAll(".key5");

keys3.forEach((key3) => {
  key3.addEventListener("click", () => Synth.play(0, key3.id, 3, 2));
});

keys4.forEach((key4) => {
  key4.addEventListener("click", () =>
    Synth.play(0, key4.id.substr(1, 3), 4, 2)
  );
});

keys5.forEach((key5) => {
  key5.addEventListener("click", () =>
    Synth.play(0, key5.id.substr(1, 3), 5, 2)
  );
});
keys3.forEach((key3) => {
  key3.addEventListener("mousedown", () => {
    key3.classList.add("active");
  });
  key3.addEventListener("mouseup", () => {
    key3.classList.remove("active");
  });
});
// function playNote(key3) {
//   Synth.play(0, key3.id, 4, 2);
//   key3.classList.add("active");
//   key3.addEventListener("mouseup", () => {
//     key.classList.remove("active");
//   });

// function playNote(key4) {
//   Synth.play(0, key4.id, 4, 2);
//   key4.classList.add("active");
//   noteAudio.addEventListener("ended", () => {
//     key.classList.remove("active");
//   });

// function playNote(key5) {
//   Synth.play(0, key5.id, 4, 2);
//   key5.classList.add("active");
//   noteAudio.addEventListener("ended", () => {
//     key.classList.remove("active");
//   });
