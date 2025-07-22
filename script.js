const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Game variables
let currentWord, currentFullWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord
        .split("")
        .map(() => `<li class="letter"></li>`)
        .join("");
    keyboardDiv.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
    gameModal.classList.remove("show");
};

const getRandomWord = () => {
    const { word, fullWord, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;         // không dấu (để chơi)
    currentFullWord = fullWord; // có dấu (để hiển thị đáp án)
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
};

const gameOver = (isVictory) => {
    const modalText = isVictory ? `Bạn đã tìm được từ:` : "Đáp án đúng là:";
    gameModal.querySelector("img").src = `images/${isVictory ? "victory" : "lost"}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? "🎉 Chúc mừng!" : "😢 Thua rồi!";
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentFullWord}</b>`;
    gameModal.classList.add("show");
};

const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                correctLetters.push(letter);
                const li = wordDisplay.querySelectorAll("li")[index];
                li.innerText = letter;
                li.classList.add("guessed");
            }
        });
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
};

// Tạo bàn phím a-z
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
