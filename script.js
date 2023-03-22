function generateLetterGrid(size, vowelPercentage) {
    const vowelList = ['a', 'e', 'i', 'o', 'u'];
    const grid = [];
  
    // Calculate the number of vowels needed based on the specified percentage
    const totalCells = size * size;
    const vowelCount = Math.floor(totalCells * vowelPercentage);
    const consonantCount = totalCells - vowelCount;
  
    // Create an array of vowels and consonants with the correct counts
    let letters = [];
    for (let i = 0; i < vowelCount; i++) {
      letters.push(vowelList[Math.floor(Math.random() * vowelList.length)]);
    }
    for (let i = 0; i < consonantCount; i++) {
      letters.push(String.fromCharCode(Math.floor(Math.random() * 26) + 97)); // Randomly select a lowercase letter
    }
  
    // Shuffle the array to randomize the letter positions
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
  
    // Populate the grid with the shuffled letters
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        row.push(letters[i * size + j]);
      }
      grid.push(row);
    }
  
    return grid;
  }
  
  function randomizeQLocation(grid) {
    const size = grid.length;
    const qRow = Math.floor(Math.random() * size);
    const qCol = Math.floor(Math.random() * size);
    grid[qRow][qCol] = 'q';
  
    // Determine if a 'u' should be added
    if (qRow > 0 && grid[qRow - 1][qCol] === 'u') {
      return;
    }
    if (qRow < size - 1 && grid[qRow + 1][qCol] === 'u') {
      return;
    }
    if (qCol > 0 && grid[qRow][qCol - 1] === 'u') {
      return;
    }
    if (qCol < size - 1 && grid[qRow][qCol + 1] === 'u') {
      return;
    }
  
    // If no adjacent 'u', add 'u' with 50% probability
    const addU = Math.random() >= 0.5;
    if (addU) {
      const adjacentCells = [];
      if (qRow > 0) {
        adjacentCells.push([qRow - 1, qCol]);
      }
      if (qRow < size - 1) {
        adjacentCells.push([qRow + 1, qCol]);
      }
      if (qCol > 0) {
        adjacentCells.push([qRow, qCol - 1]);
      }
      if (qCol < size - 1) {
        adjacentCells.push([qRow, qCol + 1]);
      }
      const randomAdjacent = adjacentCells[Math.floor(Math.random() * adjacentCells.length)];
      grid[randomAdjacent[0]][randomAdjacent[1]] = 'u';
    }
  }
  function randomizeINGLocation(grid) {
    const size = grid.length;
    let iRow = Math.floor(Math.random() * size);
    let iCol = Math.floor(Math.random() * size);
    let nRow, nCol;
    let tries = 0;
  
    // Randomly select location for 'i' and 'n' that are next to each other
    do {
      if (tries > 100) {
        // If no valid location found after 100 tries, exit loop to prevent infinite loop
        return;
      }
      nRow = iRow + Math.floor(Math.random() * 3) - 1; // Randomly select a row within 1 cell of 'i'
      nCol = iCol + Math.floor(Math.random() * 3) - 1; // Randomly select a column within 1 cell of 'i'
      if (nRow < 0 || nRow >= size || nCol < 0 || nCol >= size || (nRow === iRow && nCol === iCol)) {
        // If new location is out of bounds or the same as 'i', try again
        tries++;
        continue;
      }
      if (grid[nRow][nCol] === 'n') {
        // If new location is 'n', swap 'i' and 'n' to ensure 'i' is adjacent to 'n'
        [iRow, iCol, nRow, nCol] = [nRow, nCol, iRow, iCol];
        break;
      }
      tries++;
    } while (grid[nRow][nCol] !== 'n');
  
    // Determine if a 'g' should be added
    if (nRow > 0 && iRow === nRow - 1 && grid[nRow - 1][nCol] === 'g') {
      return;
    }
    if (nRow < size - 1 && iRow === nRow + 1 && grid[nRow + 1][nCol] === 'g') {
      return;
    }
    if (nCol > 0 && iCol === nCol - 1 && grid[nRow][nCol - 1] === 'g') {
      return;
    }
    if (nCol < size - 1 && iCol === nCol + 1 && grid[nRow][nCol + 1] === 'g') {
      return;
    }
  
    // If no adjacent 'g', add 'g' with 50% probability
    const addG = Math.random() >= 0.5;
    if (addG) {
      const adjacentCells = [];
      if (nRow > 0 && iRow === nRow - 1) {
        adjacentCells.push([nRow - 1, nCol]);
      }
      if (nRow < size - 1 && iRow === nRow + 1) {
        adjacentCells.push([nRow + 1, nCol]);
      }
      if (nCol > 0 && iCol === nCol - 1) {
        adjacentCells.push([nRow, nCol - 1]);
      }
      if (nCol < size - 1 && iCol === nCol + 1) {
        adjacentCells.push([nRow, nCol + 1]);
      }
      if (adjacentCells.length > 0) {
        const randomAdjacent = adjacentCells[Math.floor(Math.random() * adjacentCells.length)];
        grid[randomAdjacent[0]][randomAdjacent[1]] = 'g';
    }
  }
}
function calculateScore(word, isFirst) {
    const length = word.length;
    let score = 0;
    
    // Calculate base points for word length
    if (length === 4) {
      score += 1;
    } else if (length >= 5) {
      score += 2;
    }
  
    // Add bonus point if selected first
    if (isFirst) {
      score += 1;
    }
  
    // Add points for each additional letter beyond 4
    score += length - 4;
  
    return score;
  }
  
  function isValidWord(word, dictionary) {
    return dictionary.has(word);
  }
  
  function createDictionarySet() {
    const dictionarySet = new Set();
    // Replace the file path below with the path of the actual dictionary file on your local file system
    const filePath = 'lib/word-list.txt';
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const words = fileContents.split('\n');
    for (const word of words) {
      dictionarySet.add(word.trim().toLowerCase());
    }
    return dictionarySet;
  }
  function isValidWord(word, dictionary) {
    return dictionary.has(word);
  }
  function updateScore(word, score, isFirst, playerScores) {
    const playerScore = playerScores.find(ps => ps.word === word);
    if (playerScore) {
      // Update score for existing word
      playerScore.score += score;
      if (isFirst) {
        playerScore.bonusPoints += 1;
      }
    } else {
      // Add score for new word
      const newPlayerScore = {
        word: word,
        score: score,
        bonusPoints: isFirst ? 1 : 0,
      };
      playerScores.push(newPlayerScore);
    }
  }
  function getRanking(playerScore, playerScores) {
    const sortedScores = playerScores.sort((a, b) => b.score - a.score);
    const index = sortedScores.findIndex(ps => ps.word === playerScore.word);
    const ranking = index + 1;
    return ranking;
  }

  function playSoundEffect(sound) {
    const audio = new Audio(sound);
    audio.play();
  }
  function addGlowEffect(selectedLetters) {
    selectedLetters.forEach(letter => {
      letter.classList.add('glow');
    });
  }
  function removeGlowEffect(selectedLetters) {
    selectedLetters.forEach(letter => {
      letter.classList.remove('glow');
    });
  }
   