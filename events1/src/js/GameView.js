export default class GameView {
    constructor() {
      this.gameContainer = document.querySelector('.game-container');
      this.hitCounter = document.querySelector('.hit');
      this.lostCounter = document.querySelector('.lost');
      this.restartButton = null;
      this.cells = [];
      
      this.onCellClick = null;
  
      this.createGameField();
    }
  
    createGameField() {
      for (let i = 0; i < 16; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => {
          if (this.onCellClick) {
            this.onCellClick(i);
          }
        });
        this.cells.push(cell);
        this.gameContainer.appendChild(cell);
      }
    }
  
    moveGoblinTo(index) {
      const goblinElement = document.querySelector('.goblin');
      if (goblinElement) {
        this.cells[index].appendChild(goblinElement);
      }
    }
  
    updateScore(score, missCount) {
      this.hitCounter.textContent = `Попаданий: ${score}`;
      this.lostCounter.textContent = `Промахов: ${missCount}`;
    }
  
    showGameOver(score) {
      this.hitCounter.textContent = `Игра окончена! Ваш счёт: ${score}`;
      this.lostCounter.textContent = '';
    }
  
    showRestartButton(resetCallback) {
      if (!this.restartButton) {
        this.restartButton = document.createElement('button');
        this.restartButton.textContent = 'Начать заново';
        this.restartButton.classList.add('restart-button');
        this.restartButton.addEventListener('click', resetCallback);
        document.querySelector('.score').appendChild(this.restartButton);
      }
      this.restartButton.style.display = 'block';
    }
  
    hideRestartButton() {
      if (this.restartButton) {
        this.restartButton.style.display = 'none';
      }
    }
  }