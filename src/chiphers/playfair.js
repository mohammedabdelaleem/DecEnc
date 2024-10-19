class PlayfairCipher {
  constructor(key) {
      this.grid = this.generateGrid(key);
  }

  // Generate a 5x5 grid for the Playfair cipher key
  generateGrid(key) {
      let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";  // 'J' is merged with 'I'
      key = key.toUpperCase().replace(/J/g, "I");
      let keyString = "";
      let grid = [];
      let usedLetters = new Set();

      // Create keyString by adding unique characters from key first, then remaining alphabet letters
      for (let char of key) {
          if (!usedLetters.has(char) && alphabet.includes(char)) {
              keyString += char;
              usedLetters.add(char);
          }
      }

      for (let char of alphabet) {
          if (!usedLetters.has(char)) {
              keyString += char;
              usedLetters.add(char);
          }
      }

      // Fill grid with keyString
      for (let i = 0; i < 5; i++) {
          grid[i] = keyString.slice(i * 5, i * 5 + 5).split('');
      }

      return grid;
  }

  // Utility to find the position of a character in the grid
  findPosition(char) {
      char = char === 'J' ? 'I' : char; // Treat 'J' as 'I'
      for (let row = 0; row < 5; row++) {
          for (let col = 0; col < 5; col++) {
              if (this.grid[row][col] === char) {
                  return [row, col];
              }
          }
      }
  }

  // Encrypt a pair of letters
  encryptPair(pair) {
      let [row1, col1] = this.findPosition(pair[0]);
      let [row2, col2] = this.findPosition(pair[1]);

      if (row1 === row2) {
          return this.grid[row1][(col1 + 1) % 5] + this.grid[row2][(col2 + 1) % 5];
      } else if (col1 === col2) {
          return this.grid[(row1 + 1) % 5][col1] + this.grid[(row2 + 1) % 5][col2];
      } else {
          return this.grid[row1][col2] + this.grid[row2][col1];
      }
  }

  // Decrypt a pair of letters
  decryptPair(pair) {
      let [row1, col1] = this.findPosition(pair[0]);
      let [row2, col2] = this.findPosition(pair[1]);

      if (row1 === row2) {
          return this.grid[row1][(col1 + 4) % 5] + this.grid[row2][(col2 + 4) % 5];
      } else if (col1 === col2) {
          return this.grid[(row1 + 4) % 5][col1] + this.grid[(row2 + 4) % 5][col2];
      } else {
          return this.grid[row1][col2] + this.grid[row2][col1];
      }
  }

  // Prepare text: remove spaces, handle double letters, pad with 'X'
  prepareText(text) {
      text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");

      let result = "";
      for (let i = 0; i < text.length; i += 2) {
          let first = text[i];
          let second = text[i + 1] || 'X'; // Pad with 'X' if odd length

          if (first === second) {
              result += first + 'X'; // Handle double letters
              i--; // Re-process the second letter
          } else {
              result += first + second;
          }
      }

      return result;
  }

  // Encrypt full text
  encrypt(plainText) {
      let preparedText = this.prepareText(plainText);
      let cipherText = "";

      for (let i = 0; i < preparedText.length; i += 2) {
          cipherText += this.encryptPair(preparedText.slice(i, i + 2));
      }

      return cipherText;
  }

  // Decrypt full text
  decrypt(cipherText) {
      let plainText = "";

      for (let i = 0; i < cipherText.length; i += 2) {
          plainText += this.decryptPair(cipherText.slice(i, i + 2));
      }

      return plainText;
  }

  cleanDecryptedText(decryptedText) {
    // Remove 'X' between repeated letters (assuming it's padding)
    return decryptedText.replace(/X/g, '').replace(/I/g, 'J');  // Treat 'I' as 'J'
}


}

export default PlayfairCipher; 