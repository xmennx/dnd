export default class Goblin {
    constructor() {
      this.element = document.querySelector('.goblin');
      if (this.element && !this.element.classList.contains('goblin-active')) {
        this.element.classList.add('goblin-active');
      }
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