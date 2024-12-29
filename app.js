// Assuming the URL is "index.html?id=123"
const urlParams = new URLSearchParams(window.location.search);
const imageIdx = urlParams.get('idx'); // "123"
const rangeInput = document.getElementById('slider-input');

loadPuzzle(imageIdx, rangeInput.value);


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

function closePopUp(popUpId) {
    let popUp = document.getElementById(popUpId);
    popUp.style.display = 'none';
    popUp.style.zIndex = '-10';
}

function openPopUp(popUpId) {
    let popUp = document.getElementById(popUpId);
    popUp.style.display = 'flex';
    popUp.style.zIndex = '10';
}


function updatePuzzle() {
    // clear puzzle (remove all children of grid-container)
    let gridContainer = document.getElementById('grid-container');
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }

    loadPuzzle(imageIdx, rangeInput.value);
    closePopUp('settings');
}
