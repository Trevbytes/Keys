/*--------------Piano js code with help by a YouTube tutorial by Kyle.  https://www.youtube.com/watch?v=vjco5yKZpU8 */
const keys3 = document.querySelectorAll(".key3");
const keys4 = document.querySelectorAll(".key4");
const keys5 = document.querySelectorAll(".key5");

keys3.forEach((key3) => {
  key3.addEventListener("mousedown", () =>
    Synth.play(0, key3.id.substr(1, 3), 3, 2)
  );
});

keys4.forEach((key4) => {
  key4.addEventListener("mousedown", () =>
    Synth.play(0, key4.id.substr(1, 3), 4, 2)
  );
});

keys5.forEach((key5) => {
  key5.addEventListener("mousedown", () =>
    Synth.play(0, key5.id.substr(1, 3), 5, 2)
  );
});

/*--Adding and removing active class to piano keys. Help from Leesa Ward. https://gist.github.com/doubleedesign/08f89ad1c4f0ba73ffdbc727136da190 --*/
for (var i = 0; i < keys3.length; i++) {
  // Add 'open' class on mouseover
  keys3[i].addEventListener("mousedown", function () {
    this.classList.add("active");
  });

  // Remove 'open" class with a delay
  keys3[i].addEventListener("mouseup", function () {
    var node = this; // Allows us to access 'this' within the timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });

  keys3[i].addEventListener("mouseout", function () {
    var node = this; // Allows us to access 'this' within the timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
}

for (var i = 0; i < keys4.length; i++) {
  // Add 'open' class on mouseover
  keys4[i].addEventListener("mousedown", function () {
    this.classList.add("active");
  });

  // Remove 'open" class with a delay
  keys4[i].addEventListener("mouseup", function () {
    var node = this; // Allows us to access 'this' within the timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });

  keys4[i].addEventListener("mouseout", function () {
    var node = this; // Allows us to access 'this' within the timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
}

for (var i = 0; i < keys5.length; i++) {
  // Add 'open' class on mouseover
  keys5[i].addEventListener("mousedown", function () {
    this.classList.add("active");
  });

  // Remove 'open" class with a delay
  keys5[i].addEventListener("mouseup", function () {
    var node = this; // Allows us to access 'this' within the timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });

  keys5[i].addEventListener("mouseout", function () {
    var node = this; // Allows us to access 'this' within the timeout function
    setTimeout(function () {
      node.classList.remove("active");
    }, 300);
  });
}
