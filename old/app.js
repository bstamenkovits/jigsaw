// Assuming the URL is "index.html?id=123"
const urlParams = new URLSearchParams(window.location.search);
const imageIdx = urlParams.get('idx'); // "123"

// Difficulty slider (resolution)
const rangeInput = document.getElementById('slider-input');
const rangeValue = document.getElementById('difficulty-value');

loadPuzzle(imageIdx, rangeInput.value);

rangeInput.addEventListener('input', function() {
    let gridContainer = document.getElementById('grid-container');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    rangeValue.textContent = this.value;
    loadPuzzle(imageIdx, this.value);
});


function loadPuzzle(imageIdx, resolution) {
    fetch('images.json')
        .then(response => { return response.json(); })
        .then(data => {
            let imageData = data[imageIdx]
            let ratio = imageData.width/imageData.height

            let nRows = (ratio > 1) ? resolution : Math.floor(resolution/ratio)
            let nCols = (ratio < 1) ? resolution : Math.floor(resolution*ratio)
            
            let board = new Board(nRows, nCols, imageData.name)
        })
}



// loadPuzzle(imageIdx, resolution);
// loadPuzzle(imageIdx, resolution);