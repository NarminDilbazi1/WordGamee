   
const wordsHints = [

  { word: "Apple", hint: "A fruit that can be red, green, or yellow." },
  { word: "Pyramid", hint: "An ancient structure found in Egypt." },
  { word: "Dolphin", hint: "A highly intelligent marine mammal known for its playful behavior." },
  { word: "Amazon", hint: "The largest river by discharge volume of water in the world, located in South America." },
  { word: "Sahara", hint: "The largest hot desert in the world, located in Africa." },
  { word: "Everest", hint: "The highest mountain peak in the world, located in the Himalayas." },
  { word: "Inception", hint: "A movie about dreams within dreams, directed by Christopher Nolan." },
  { word: "Titanic", hint: "A 1997 film about a famous ship that sank on its maiden voyage." },
  { word: "Matrix", hint: "A sci-fi movie where reality is simulated by machines." },
  { word: "Elephant", hint: "The largest land animal with a long trunk." },
  { word: "Cheetah", hint: "The fastest land animal known for its speed." },
  { word: "Koala", hint: "A marsupial native to Australia, known for its love of eucalyptus leaves." },
  { word: "Titanic", hint: "A tragic romance film about a ship that sank on its maiden voyage in 1912." },
  { word: "Frozen", hint: "An animated Disney movie about two sisters, one with the power to control ice and snow." },
]

let startButton = document.querySelector('.start');
let scoreElement = document.querySelector('.score');
let timeElement = document.querySelector('.time');
let letterButtons = document.querySelectorAll('.grid button');
let nextWordButton = document.querySelector('.nextWord');
let hintButton = document.querySelector('.hint');
let hintBox = document.querySelector('.hintText');
let wordBoxes = document.querySelector('.add');

let selectedWord;
let selectedHint;
let wordNumber = 0;
let score = 0; // Initialize the score

function changeScore(point) {
  score += point; // Update the score
  scoreElement.innerHTML = `Score: ${score}`;
}

function checkBoxes() {
  let boxes = document.querySelectorAll(".letter");
  for (let i = 0; i < boxes.length; i++) {
    if (boxes[i].innerHTML === "") {
      return false; 
    }
  }
  gotoNextWord(); 
  return true;
}

function startTimer() {
  alert('Game started! Find as many words as you can in 30 seconds.');
  let countdown = 30;
  timeElement.style.backgroundColor = 'lime';
  timeElement.innerHTML = `Time: ${countdown}`;
  const intervalId = setInterval(() => {
    countdown--;
    timeElement.innerHTML = `Time: ${countdown}`;
    if (countdown <= 0) {
      timeElement.style.backgroundColor = "red";
      clearInterval(intervalId);
      alert("Time is up");
    }
  }, 1000);
}

function createBoxes() {
  wordBoxes.innerHTML = ""; // Clear previous boxes
  for (let i = 0; i < selectedWord.length; i++) {
    let div = document.createElement("div");
    div.classList.add("letter");
    wordBoxes.appendChild(div);
  }
}

function onStartGame() {
  selectedWord = wordsHints[wordNumber].word.toLowerCase();
  selectedHint = wordsHints[wordNumber].hint;
  wordBoxes.style.backgroundColor = "rgba(197, 184, 184, 0)";
  createBoxes();
}

function gotoNextWord() {
  wordNumber++;
  if (wordNumber < wordsHints.length) {
    selectedWord = wordsHints[wordNumber].word.toLowerCase();
    selectedHint = wordsHints[wordNumber].hint;
    createBoxes();
  } else {
    alert("No more words available.");
  }
}
function resetLetters() {
  letterButtons.forEach(e => {
    e.style.backgroundColor = "rgb(0, 255, 255)";
  })
  hintBox.innerHTML = ""
}
function showHint() {
  hintBox.innerHTML = '';
  let div = document.createElement("div");
  div.classList.add("hintText");
  div.innerHTML = selectedHint;
  hintBox.appendChild(div);
}

startButton.addEventListener('click', () => {
  score = 0; // Reset the score at the start of the game
  scoreElement.innerHTML = "Score:" + score; // Display the reset score
  startTimer();
  onStartGame();
    //  Change letter color and add box-shadow
  letterButtons.forEach((button) => {
    button.style.boxShadow = '0px 0px 16px 5px rgb(233 241 248 / 72%)';
  });
});

hintButton.addEventListener("click", showHint);
nextWordButton.addEventListener("click", gotoNextWord);

letterButtons.forEach((element) => {
  element.addEventListener("click", (e) => {
    let guessedLetter = e.target.textContent.toLowerCase();
    if (e.target.style.backgroundColor === "green" || e.target.style.backgroundColor === "red") {
      return;
    }
    if (selectedWord.includes(guessedLetter)) {
      let boxes = document.querySelectorAll(".letter");
      for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i] === guessedLetter) {
          boxes[i].innerHTML = guessedLetter;
          changeScore(10); // Increase score
          e.target.style.backgroundColor = "green";
          if (checkBoxes()) {
            gotoNextWord();
            resetLetters();
          }
        }
      }
    } else {
      e.target.style.backgroundColor = "red";
      changeScore(-10); // Decrease score
    }
  });
});















