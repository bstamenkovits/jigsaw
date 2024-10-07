const rangeInput = document.getElementById('slider-input');
const rangeValue = document.getElementById('difficulty-value');

console.log('puzzle.js loaded');
rangeInput.addEventListener('input', function() {
    // let gridContainer = document.getElementById('grid-container');
    // while (gridContainer.firstChild) {
    //     gridContainer.removeChild(gridContainer.firstChild);
    // }

    rangeValue.textContent = this.value;
    // loadPuzzle(imageIdx, this.value);
});