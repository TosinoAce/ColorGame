document.addEventListener("DOMContentLoaded", () => {
  const targetColorBox = document.getElementById("target-color");
  const colorOptions = document.querySelectorAll(".color-options");
  const gameStatus = document.getElementById("game-status");
  const scoreBoard = document.getElementById("score");
  const newGameButton = document.getElementById("new-game");
  const correctSound = document.getElementById("correct");
  const wrongSound = document.getElementById("wrong");
  const restartSound = document.getElementById("restart");

  let colors = [
    "red",
    "blue",
    "green",
    "yellow",
    "purple",
    "orange",
    "pink",
    "cyan",
    "black",
    "white",
    "brown",
    "lime",
    "magenta",
    "teal",
    "navy",
    "gold",
    "silver",
    "violet",
    "indigo",
    "coral",
    "maroon",
    "turquoise",
    "beige",
    "olive",
    "salmon",
    "khaki",
    "lavender",
    "crimson",
    "aqua",
    "mint",
    "peach",
    "plum",
    "ivory",
    "orchid",
    "chocolate",
    "skyblue",
    "tan",
    "hotpink",
    "darkgreen",
    "lightblue",
    "slategray",
  ];
  let targetColor = "";
  let score = 0;

  function startGame(resetScore = false) {
    if (resetScore) {
      score = 0;
      scoreBoard.textContent = score;
    }

    gameStatus.textContent = "";
    targetColor = colors[Math.floor(Math.random() * colors.length)];
    targetColorBox.style.backgroundColor = targetColor;

    let options = new Set();
    options.add(targetColor);
    while (options.size < 6) {
      options.add(colors[Math.floor(Math.random() * colors.length)]);
    }

    let shuffledColors = Array.from(options).sort(() => Math.random() - 0.5);

    colorOptions.forEach((option, index) => {
      option.style.backgroundColor = shuffledColors[index];
      option.setAttribute("data-color", shuffledColors[index]);
    });
  }

  colorOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      let selectedColor = e.target.getAttribute("data-color");

      if (selectedColor === targetColor) {
        gameStatus.textContent = "Correct! Good Job";
        gameStatus.style.color = "green";
        correctSound.play();
        score += 10;
      } else {
        gameStatus.textContent = "Wrong Guess! Try Again.";
        gameStatus.style.color = "red";
        wrongSound.play();
        score = Math.max(0, score - 5);
      }

      scoreBoard.textContent = score;
      setTimeout(() => {
        startGame(); // Automatically reshuffle after each guess with slight delay
      }, 1300);
    });
  });

  newGameButton.addEventListener("click", () => {
    restartSound.play();
    setTimeout(() => {
      startGame(true); // Resets score and reshuffles
    }, 1000);
  });

  startGame();
});
