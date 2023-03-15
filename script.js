

class GameBoard {
  constructor(size) {
    this.size = size;
    this.board = this.generateBoard(size);
  }

  generateBoard(size) {
    const vowels = ['A', 'E', 'I', 'O', 'U'];
    let vowelCount = Math.floor(size * size * 0.25);
    let consonantCount = size * size - vowelCount;
    const board = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        if (vowelCount > 0 && Math.random() < 0.25) {
          const letter = vowels[Math.floor(Math.random() * vowels.length)];
          vowelCount--;
          row.push(letter);
        } else {
          const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
          consonantCount--;
          row.push(letter);
        }
      }
      board.push(row);
    }
    return board;
  }

  displayBoard(elementId) {
    const gameBoardElement = document.getElementById(elementId);
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < this.size; i++) {
      const rowElement = document.createElement('div');
      rowElement.classList.add('game-board-row');
      for (let j = 0; j < this.size; j++) {
        const letterElement = document.createElement('div');
        letterElement.classList.add('game-board-letter');
        letterElement.innerText = this.board[i][j];
        rowElement.appendChild(letterElement);
      }
      gameBoardElement.appendChild(rowElement);
    }
  }
}
const boardSize = 5; // or 7 for a 7x7 board
const gameBoard = new GameBoard(boardSize);
gameBoard.displayBoard('game-board');
