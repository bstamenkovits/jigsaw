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

            let puzzleContainer = document.getElementById('puzzle-container');

            let puzzleWidth = 0.8*window.innerWidth
            let puzzleHeight = puzzleWidth/ratio

            let pieceWidth = puzzleWidth/nCols
            let pieceHeight = puzzleHeight/nRows
            let top = 100
            let left = 150
            let piece = document.createElement('div');
            puzzleContainer.appendChild(piece)
            piece.className = 'piece';
            piece.style.width = `${pieceWidth}px`;
            piece.style.height = `${pieceHeight}px`;
            piece.style.position = 'absolute';
            piece.style.top = `${top}px`;
            piece.style.left = `${left}px`;

            let dragging = false
            let cursorStartPos = {x: null, y: null}
            let cursorPos = {x: null, y: null}
            piece.addEventListener("mousedown", (e) => {
                console.log('mousedown')
                dragging = true
                cursorStartPos.x = e.clientX
                cursorStartPos.y = e.clientY

                console.log(cursorStartPos)
            })
            piece.addEventListener("mouseup", (e) => {
                console.log('mouseup')
                top = parseFloat(piece.style.top)
                left = parseFloat(piece.style.left)
                console.log(top, left)
                dragging = false
            })
            piece.addEventListener("mousemove", (e) => {
                if (dragging) {
                    console.log('mousemove')
                    cursorPos.x = e.clientX
                    cursorPos.y = e.clientY
                    dx = cursorStartPos.x - cursorPos.x
                    dy = cursorStartPos.y - cursorPos.y
                    piece.style.top = `${top-dy}px`
                    piece.style.left = `${left-dx}px`


                }
            })

            // for (let i = 0; i < nRows; i++) {
            //     for (let j = 0; j < nCols; j++) {
            //         let div = document.createElement('div');
            //         div.className = 'piece';
            //         puzzleContainer.appendChild(div);
            //     }
            // }
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
