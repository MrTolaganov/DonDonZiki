window.addEventListener("DOMContentLoaded", () => {
  const choices = document.querySelectorAll(".choice"),
    score = document.querySelector("#score"),
    modal = document.querySelector(".modal"),
    result = document.querySelector("#result"),
    restart = document.querySelector("#restart"),
    scoreBoard = {
      player: 0,
      computer: 0,
    };

  // Play game
  function play(event) {
    restart.style.display = "inline-block";
    const playerChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);
    showWinner(winner, computerChoice);
  }

  // Get computer choice
  function getComputerChoice() {
    const randomNum = Math.floor(Math.random() * 3) + 1;
    if (randomNum === 3) {
      return "scissors";
    } else if (randomNum === 2) {
      return "paper";
    } else {
      return "rock";
    }
  }

  // Get winner
  function getWinner(p, c) {
    if (
      (p === "rock" && c === "scissors") ||
      (p === "paper" && c === "rock") ||
      (p === "scissors" && c === "paper")
    ) {
      return "player";
    } else if (
      (c === "rock" && p === "scissors") ||
      (c === "paper" && p === "rock") ||
      (c === "scissors" && p === "paper")
    ) {
      return "computer";
    } else {
      return "draw";
    }
  }

  // Show winner
  function showWinner(winner, computerChoice) {
    if (winner === "player") {
      scoreBoard.player++;
      result.innerHTML = `
        <h1 class="text-win">You win</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Compute chose <strong>${
          computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
        }</strong></p>
      `;
    } else if (winner === "computer") {
      scoreBoard.computer++;
      result.innerHTML = `
        <h1 class="text-lose">You lose</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Compute chose <strong>${
          computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
        }</strong></p>
      `;
    } else {
      result.innerHTML = `
        <h1>It's a draw</h1>
        <i class="fas fa-hand-${computerChoice} fa-10x"></i>
        <p>Compute chose <strong>${
          computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
        }</strong></p>
      `;
    }

    score.innerHTML = `
      <p>Player: ${scoreBoard.player}</p>
      <p>Computer: ${scoreBoard.computer}</p>
    `;

    modal.style.display = "block";
  }

  // Restart game
  function restartGame() {
    scoreBoard.player = 0;
    scoreBoard.computer = 0;
    score.innerHTML = `
      <p>Player: ${scoreBoard.player}</p>
      <p>Computer: ${scoreBoard.computer}</p>
    `;
  }

  // Clear modal
  function clearModal(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  // Events
  choices.forEach((choice) => choice.addEventListener("click", play));
  window.addEventListener("click", clearModal);
  restart.addEventListener("click", restartGame);
});
