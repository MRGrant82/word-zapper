function generateGameBoard() {
    const boardSize = 5;
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
  