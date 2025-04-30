const noteMap = {
  'C': ['c3', 'c4', 'c5', 'c6'],
  'C#/Db': ['cs3', 'cs4', 'cs5'],
  'D': ['d3', 'd4', 'd5'],
  'D#/Eb': ['ds3', 'ds4', 'ds5'],
  'E': ['e3', 'e4', 'e5'],
  'F': ['f3', 'f4', 'f5'],
  'F#/Gb': ['fs3', 'fs4', 'fs5'],
  'G': ['g3', 'g4', 'g5'],
  'G#/Ab': ['gs3', 'gs4', 'gs5'],
  'A': ['a3', 'a4', 'a5'],
  'A#/Bb': ['as3', 'as4', 'as5'],
  'B': ['b3', 'b4', 'b5']
};

let currentNote = '';
let currentAudio = null;
let correct = 0;
let incorrect = 0;

const noteButtonsContainer = document.getElementById('note-buttons');
const questionText = document.getElementById('question');

const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const totalCount = document.getElementById('total-count');
const accuracyDisplay = document.getElementById('accuracy');

const playReferenceButton = document.getElementById('play-reference');
const replayNoteButton = document.getElementById('replay-note');
const nextButton = document.getElementById('next-button');
const resetButton = document.getElementById('reset-button');
const startButton = document.getElementById('start-button');
const gameScreen = document.getElementById('game-screen');
const startScreen = document.getElementById('start-screen');

const noteNames = Object.keys(noteMap);

noteNames.forEach(name => {
  const btn = document.createElement('button');
  btn.textContent = name;
  btn.classList.add('blue-button');
  btn.addEventListener('click', () => checkAnswer(name, btn));
  noteButtonsContainer.appendChild(btn);
});

function getRandomNote() {
  const allNotes = Object.values(noteMap).flat();
  const random = allNotes[Math.floor(Math.random() * allNotes.length)];
  return random;
}

function playNote(note) {
  if (currentAudio) {
    currentAudio.pause();
  }
  currentAudio = new Audio(`audio/${note}.mp3`);
  currentAudio.play();
}

function startGame() {
  correct = 0;
  incorrect = 0;
  updateScore();
  startScreen.style.display = 'none';
  gameScreen.style.display = 'block';
  loadNextNote();
}

function loadNextNote() {
  resetButtons();
  currentNote = getRandomNote();
  playNote(currentNote);
  questionText.textContent = 'Which note was played?';
  nextButton.disabled = true;
}

function checkAnswer(selected, button) {
  if (noteMap[selected].includes(currentNote)) {
    correct++;
    button.classList.add('correct');
    questionText.textContent = `Correct! ✅ The note was '${currentNote}'`;
  } else {
    incorrect++;
    button.classList.add('incorrect');
    questionText.textContent = `Incorrect! ❌ The note played was actually '${currentNote}'`;
  }
  updateScore();
  disableNoteButtons();
  nextButton.disabled = false;
}

function disableNoteButtons() {
  document.querySelectorAll('#note-buttons button').forEach(btn => {
    btn.disabled = true;
  });
}

function resetButtons() {
  document.querySelectorAll('#note-buttons button').forEach(btn => {
    btn.disabled = false;
    btn.classList.remove('correct', 'incorrect');
  });
}

function updateScore() {
  const total = correct + incorrect;
  const accuracy = total ? ((correct / total) * 100).toFixed(1) : 0.0;
  correctCount.textContent = correct;
  incorrectCount.textContent = incorrect;
  totalCount.textContent = total;
  accuracyDisplay.textContent = `${accuracy}%`;
}

playReferenceButton.addEventListener('click', () => playNote('c4'));
replayNoteButton.addEventListener('click', () => playNote(currentNote));
nextButton.addEventListener('click', loadNextNote);
resetButton.addEventListener('click', () => {
  gameScreen.style.display = 'none';
  startScreen.style.display = 'block';
});
startButton.addEventListener('click', startGame);
