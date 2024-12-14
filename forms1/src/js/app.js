export function setupPopover() {
    const popover = document.getElementById('myPopover');
    if (popover.style.display === 'none' || popover.style.display === '') {
      popover.style.display = 'block';
    } else {
      popover.style.display = 'none';
    }
  
    const buttonRect = document.getElementById('toggleButton').getBoundingClientRect();
    popover.style.top = `${buttonRect.top - popover.offsetHeight - 5}px`;
    popover.style.left = `${buttonRect.left}px`;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('toggleButton').addEventListener('click', () => {
      setupPopover();
    });
  });
  
  export default setupPopover;