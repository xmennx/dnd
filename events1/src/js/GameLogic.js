import Goblin from './Goblin';
import GameView from './GameView';

export default class GameLogic {
  constructor(view) {
    this.view = view;
    this.hitCounter = 0;
    this.missCount = 0;
    this.score = 0;
    this.prevCell = 0;
    this.activeCellIndex = null;
    this.intervalId = null;
    this.gameOver = false;
    
    this.goblin = new Goblin();
    this.view.onCellClick = this.handleCellClick.bind(this);

    this.startGame();
  }

  startGame() {
    this.moveGoblin();

    this.intervalId = setInterval(() => {
      if (this.gameOver) return;
      this.moveGoblin();
      
      if (this.missCount >= 5) {
        this.endGame();
      }
    }, 1000);
  }

  generateRandomPosition() {
    let randomCell;
    do {
      randomCell = Math.floor(Math.random() * 16);
    } while (this.prevCell === randomCell);
    
    this.prevCell = randomCell;
    return randomCell;
  }

  handleCellClick(index) {
    if (index === this.activeCellIndex) {
      this.score++;
      this.hitCounter++;
      this.view.updateScore(this.score, this.missCount);
      this.goblin.removeGoblinClass();
    } else {
      this.missCount++;
      this.view.updateScore(this.score, this.missCount);
      if (this.missCount >= 5) {
        this.endGame();
      }
    }
  }

  moveGoblin() {
    const cellIndex = this.generateRandomPosition();
    this.activeCellIndex = cellIndex;
    this.view.moveGoblinTo(cellIndex);
  }

  endGame() {
    clearInterval(this.intervalId);
    this.gameOver = true;
    this.view.showGameOver(this.score);
    this.view.showRestartButton(() => this.resetGame());
  }

  resetGame() {
    this.gameOver = false;
    this.hitCounter = 0;
    this.missCount = 0;
    this.score = 0;
    this.prevCell = 0;
    this.view.updateScore(this.score, this.missCount);
    this.view.hideRestartButton();
    this.startGame();
  }
}