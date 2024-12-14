export default class Goblin {
  constructor() {
    this.element = document.createElement('img');
    this.element.src = 'path_to_goblin_image.png';
    this.element.classList.add('goblin');
    document.body.appendChild(this.element);
    this.removeGoblinClass();
  }

  moveTo(cell) {
    if (this.element && cell instanceof Node) {
      cell.appendChild(this.element);
    }
  }

  removeGoblinClass() {
    this.element.classList.remove('goblin-active');
  }
}