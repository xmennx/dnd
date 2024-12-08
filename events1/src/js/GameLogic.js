import Goblin from './Goblin';
import CellRenderer from './CellRender';

export default class GameLogic {
  constructor() {
    this.gameContainer = document.querySelector('.game-container');
    this.hitCounter = document.querySelector('.hit');
    this.lostCounter = document.querySelector('.lost');
    this.restartButton = null;
    this.intervalId = null;
    this.gameOver = false;
    this.score = 0;
    this.prevCell = 0;
    this.missCount = 0;
    this.cells = [];
    this.goblin = new Goblin();

    this.generateGameField();
    this.moveGoblin();
    this.handleGoblinClick();
  }

  generateGameField() {
    for (let i = 0; i < 16; i++) {
      const cell = new CellRenderer();
      this.cells.push(cell);
      this.gameContainer.appendChild(cell.element);
    }
  }

  generateRandomPosition() {
    if (this.cells.length === 1) {
      return this.cells[0];
    }

    let randomCell;
    do {
      randomCell = Math.floor(Math.random() * this.cells.length);
    } while (this.prevCell === randomCell);

    this.prevCell = randomCell;
    return this.cells[randomCell].element;
  }

  moveGoblin() {
    this.placeGoblin();

    this.intervalId = setInterval(() => {
      this.placeGoblin();
      this.goblin.element.classList.add('goblin-active');

      if (this.missCount >= 5) {
        this.endGame();
      }
    }, 1000);
  }

  placeGoblin() {
    const randomCell = this.generateRandomPosition();
    this.goblin.moveTo(randomCell);
  }

  handleGoblinClick() {
    this.gameContainer.addEventListener('click', (event) => {
      const goblinCell = event.target;
      if (goblinCell.classList.contains('goblin-active')) {
        this.score++;
        this.hitCounter.textContent = `Попаданий: ${this.score}`;
        this.goblin.removeGoblinClass();
      } else {
        this.missCount++;
        this.lostCounter.textContent = `Промахов: ${this.missCount}`;
      }
    });
  }

  endGame() {
    clearInterval(this.intervalId);
    if (this.hitCounter && this.lostCounter) {
      this.hitCounter.textContent = `Игра окончена! Ваш счёт: ${this.score}`;
      this.lostCounter.textContent = '';
    }

    this.missCount = 0;
    this.score = 0;
    this.goblin.removeGoblinClass();
    this.createRestartButton();
    this.showRestartButton();
    this.gameOver = true;
  }

  createRestartButton() {
    const scoreContainer = document.querySelector('.score');

    if (!this.restartButton) {
      this.restartButton = document.createElement('button');
      this.restartButton.textContent = 'Начать заново';
      this.restartButton.classList.add('restart-button');
      this.restartButton.addEventListener('click', () => {
        this.resetGame();
      });

      scoreContainer.appendChild(this.restartButton);
    }
  }

  resetGame() {
    this.gameOver = false;
    this.score = 0;
    this.prevCell = 0;
    this.missCount = 0;

    if (this.hitCounter && this.lostCounter) {
      this.hitCounter.textContent = 'Попаданий: 0';
      this.lostCounter.textContent = 'Промахов: 0';
    }

    this.goblin.removeGoblinClass();
    this.placeGoblin();
    this.moveGoblin();

    this.hideRestartButton();
  }

  showRestartButton() {
    this.restartButton.style.display = 'block';
  }

  hideRestartButton() {
    this.restartButton.style.display = 'none';
  }
}