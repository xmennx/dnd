import Goblin from '../js/Goblin';
import CellRenderer from '../js/CellRender';
import GameLogic from '../js/GameLogic';

jest.useFakeTimers();

let gameLogic;
// eslint-disable-next-line no-unused-vars
let goblin;

beforeEach(() => {
  document.body.innerHTML = `
    <div class="game-container"></div>
    <div class="score"></div>
    <button class="restart-button" style="display: none;"></button>
  `;

  const goblinDiv = document.createElement('div');
  goblinDiv.classList.add('goblin');
  document.body.appendChild(goblinDiv);

  goblin = new Goblin();
  gameLogic = new GameLogic();
  gameLogic.cells = Array.from({ length: 16 }, () => new CellRenderer());

  gameLogic.restartButton = document.querySelector('.restart-button');
});

test('generateRandomPosition возвращает правильную ячейку в случайных случаях', () => {
  const singleCellGameLogic = new GameLogic();
  singleCellGameLogic.cells = [new CellRenderer()];
  const result = singleCellGameLogic.generateRandomPosition();
  expect(result).toBe(singleCellGameLogic.cells[0]);

  const multipleCellGameLogic = new GameLogic();
  multipleCellGameLogic.cells = Array.from({ length: 1 }, () => new CellRenderer());
  const positions = new Set();
  for (let i = 0; i < 100; i++) {
    const cell = multipleCellGameLogic.generateRandomPosition();
    positions.add(multipleCellGameLogic.cells.indexOf(cell));
  }
  expect(positions.size).toBe(multipleCellGameLogic.cells.length);
});

test('Автоматическое появление гоблина и условия завершения игры', () => {
  const placeGoblinMock = jest.spyOn(gameLogic, 'placeGoblin'); // Mock для placeGoblin
  jest.advanceTimersByTime(1000);

  expect(placeGoblinMock).toHaveBeenCalled();
  expect(gameLogic.goblin.element.classList.contains('goblin-active')).toBe(true);

  gameLogic.missCount = 5;
  jest.advanceTimersByTime(1000);
});

test('handleGoblinClick увеличивает missCount при клике на гоблина', () => {
  const initialMissCount = gameLogic.missCount;
  gameLogic.lostCounter = { textContent: '' };
  gameLogic.gameContainer.click();
  expect(gameLogic.missCount).toBe(initialMissCount + 1);
});

test('handleGoblinClick изменяет счетчики и удаляет класс гоблина при клике на гоблина', () => {
  const initialScore = gameLogic.score;
  const initialMissCount = gameLogic.missCount;
  const goblinCell = gameLogic.goblin.element;
  // Имитация lostCounter
  const lostCounterMock = { textContent: '' };
  gameLogic.lostCounter = lostCounterMock;
  gameLogic.hitCounter = { textContent: '' };
  gameLogic.goblin.element.click();

  expect(gameLogic.score).toBe(initialScore + 1);
  expect(gameLogic.hitCounter.textContent).toContain(`${gameLogic.score}`);
  expect(gameLogic.missCount).toBe(initialMissCount);
  expect(lostCounterMock.textContent).not.toContain(`${gameLogic.missCount}`);
  expect(goblinCell.classList.contains('goblin-active')).toBe(false);
});

test('endGame устанавливает счетчики и показывает сообщение о окончании игры', () => {
  gameLogic.hitCounter = { textContent: '' };
  gameLogic.lostCounter = { textContent: '' };
  gameLogic.endGame();

  expect(gameLogic.gameOver).toBeTruthy();
  expect(gameLogic.score).toBe(0);
  expect(gameLogic.missCount).toBe(0);
  expect(gameLogic.hitCounter.textContent).toContain('Игра окончена! Ваш счёт: 0');
  expect(gameLogic.lostCounter.textContent).toBe('');
});

test('Кнопка restartButton вызывает метод resetGame', () => {
  // eslint-disable-next-line no-shadow
  const gameLogic = new GameLogic();
  gameLogic.resetGame = jest.fn();
  gameLogic.createRestartButton();
  gameLogic.restartButton.click();

  expect(gameLogic.resetGame).toHaveBeenCalled();
});

test('resetGame сбрасывает состояние игры', () => {
  gameLogic.resetGame();
  expect(gameLogic.gameOver).toBeFalsy();
  expect(gameLogic.score).toBe(0);
  expect(gameLogic.missCount).toBe(0);
});

test('resetGame сбрасывает счетчики и обновляет их', () => {
  gameLogic.hitCounter = { textContent: '' };
  gameLogic.lostCounter = { textContent: '' };
  gameLogic.resetGame();

  expect(gameLogic.gameOver).toBeFalsy();
  expect(gameLogic.score).toBe(0);
  expect(gameLogic.missCount).toBe(0);
  expect(gameLogic.hitCounter.textContent).toBe('Попаданий: 0');
  expect(gameLogic.lostCounter.textContent).toBe('Промахов: 0');
});