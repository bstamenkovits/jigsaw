const imageIdx = 5;
const resolution = 5;

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

loadPuzzle(imageIdx, resolution);