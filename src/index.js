const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'wizard', 'programming', 'interface'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word

const displayWord = () => {
  wordEl.innerHTML = `${selectedWord
    .split('')
    .map((letter) => {
      return `<span class='letter'>
            ${correctLetters.includes(letter) ? letter : ''}
            </span>`;
    })
    .join('')}`;

  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You Won!';
    popup.style.display = 'flex';
  }
};

//show notification function
const showNotification = () => {
  notification.classList.add('show');
  setTimeout(() => {
    notification.classList.remove('show');
  }, 1500);
};

//update wrong letters
const updateWrongLetterEl = () => {
  //show the letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? '<h2>wrong</h2>' : ''}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  //show the parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = 'block';
    } else {
      part.style.display = 'none';
    }
  });

  //check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `you're hanged!!`;
    popup.style.display = 'flex';
  }
};

// keydown letter press
window.addEventListener('keydown', (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (correctLetters.includes(letter) || wrongLetters.includes(letter)) {
      showNotification();
    } else {
      if (selectedWord.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        wrongLetters.push(letter);
        updateWrongLetterEl();
      }
    }
  }
});

//play again button
playAgainBtn.addEventListener('click', () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();

  updateWrongLetterEl();
  popup.style.display = 'none';
});

displayWord();
