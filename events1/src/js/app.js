import GameLogic from './GameLogic';
import GameView from './GameView';

document.addEventListener('DOMContentLoaded', () => {
  const view = new GameView();
  new GameLogic(view);
});