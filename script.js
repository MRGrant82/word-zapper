// Create the board size switch
const boardSizeSwitch = document.createElement('div');
boardSizeSwitch.classList.add('board-size-toggle');
const smallBoardSpan = document.createElement('span');
smallBoardSpan.innerText = '5x5';
const largeBoardSpan = document.createElement('span');
largeBoardSpan.innerText = '7x7';
const boardSizeSlider = document.createElement('input');
boardSizeSlider.type = 'range';
boardSizeSlider.min = '5';
boardSizeSlider.max = '7';
boardSizeSlider.value = '5';
boardSizeSlider.classList.add('board-size-slider');
const switchLabel = document.createElement('label');
switchLabel.classList.add('switch');
const slider = document.createElement('span');
slider.classList.add('slider', 'round');
const toggle = document.createElement('input');
toggle.type = 'checkbox';
toggle.id = 'board-size-toggle';
toggle.addEventListener('click', () => {
  boardSize = toggle.checked ? 7 : 5;
  generateGameBoard();
});
switchLabel.appendChild(toggle);
switchLabel.appendChild(slider);
boardSizeSwitch.appendChild(smallBoardSpan);
boardSizeSwitch.appendChild(switchLabel);
boardSizeSwitch.appendChild(largeBoardSpan);
document.querySelector('header').appendChild(boardSizeSwitch);

function generateGameBoard() {
  let boardSize = 5;
  const gameBoard = document.querySelector('.game-board');
  const gameBoardWidth = gameBoard.offsetWidth;
  const gameBoardHeight = gameBoard.offsetHeight;
  const cellSize = Math.min(gameBoardWidth, gameBoardHeight) / boardSize;

  // Clear any existing cells
  gameBoard.innerHTML = '';

  // Set the game board container to use CSS grid
  gameBoard.style.display = 'grid';
  gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, ${cellSize}px)`;
  gameBoard.style.gridTemplateRows = `repeat(${boardSize}, ${cellSize}px)`;
  gameBoard.style.gridGap = '0';

  // Generate the game board cells
  const vowels = ['A', 'E', 'I', 'O', 'U'];
  let vowelCount = 0;
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('game-board-cell');
    cell.style.width = `${cellSize}px`;
    cell.style.height = `${cellSize}px`;
    const isVowel = Math.random() < 0.25 || vowelCount / (i + 1) < 0.25;
    const letter = isVowel ? vowels[Math.floor(Math.random() * vowels.length)] : String.fromCharCode(65 + Math.floor(Math.random() * 26));
    if (isVowel) {
      vowelCount++;
    }
    cell.innerText = letter;
    gameBoard.appendChild(cell);
  }
}

window.onload = function() {
  generateGameBoard();
}
