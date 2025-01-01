// Assuming the URL is "index.html?id=123"
const urlParams = new URLSearchParams(window.location.search);
const imageIdx = urlParams.get('idx'); // "123"
const rangeInput = document.getElementById('slider-input');

loadPuzzle(imageIdx, rangeInput.value);

class Piece {
    constructor(x, y, width, height, puzzleContainerDiv) {
        this.left = x-width/2;
        this.top = y-height/2;
        this.width = width;
        this.height = height;
        this.div = this.createDiv(puzzleContainerDiv);
        console.log(this.left, this.top)
        console.log(this.div)
        this.addEventListeners();
    }

    get x() { return this.top + this.width/2; }
    get y() { return this.left + this.height/2; }

    createDiv(puzzleContainerDiv) {
        let piece = document.createElement('div');
        puzzleContainerDiv.appendChild(piece);
        piece.className = 'piece';
        piece.style.width = `${this.width}px`;
        piece.style.height = `${this.height}px`;
        piece.style.position = 'absolute';
        piece.style.top = `${this.top}px`;
        piece.style.left = `${this.left}px`;
        return piece;
    }

    addEventListeners() {
        this.cursorStartPos = {x: null, y: null}
        this.dragging = false

        this.div.addEventListener("mousedown", (e) => {
            console.log('mousedown')
            this.dragging = true
            this.cursorStartPos.x = e.clientX
            this.cursorStartPos.y = e.clientY
        });

        this.div.addEventListener("mousemove", (e) => {

            if (this.dragging) {
                console.log('mousemove')
                let dx = this.cursorStartPos.x - e.clientX
                let dy = this.cursorStartPos.y - e.clientY

                this.div.style.top = `${this.top-dy}px`
                this.div.style.left = `${this.left-dx}px`
            }
        });

        this.div.addEventListener("mouseup", (e) => {
            console.log('mouseup')
            this.dragging = false
            this.top = parseFloat(this.div.style.top)
            this.left = parseFloat(this.div.style.left)
            console.log(this.x, this.y)
        });
    }
}

function createGrid(nRows, nCols, puzzleWidth, puzzleHeight) {
    let gridPositions = [];
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            let x = j*puzzleWidth/nCols;
            let y = i*puzzleHeight/nRows;
            gridPositions.push({x: x, y: y});
        }
    }
}


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

            let piece = new Piece(100, 100, pieceWidth, pieceHeight, puzzleContainer);
            // let top = 100
            // let left = 150


            // let dragging = false
            // let cursorStartPos = {x: null, y: null}
            // let cursorPos = {x: null, y: null}
            // piece.addEventListener("mousedown", (e) => {
            //     console.log('mousedown')
            //     dragging = true
            //     cursorStartPos.x = e.clientX
            //     cursorStartPos.y = e.clientY

            //     console.log(cursorStartPos)
            // })
            // piece.addEventListener("mouseup", (e) => {
            //     console.log('mouseup')
            //     top = parseFloat(piece.style.top)
            //     left = parseFloat(piece.style.left)
            //     console.log(top, left)
            //     dragging = false
            // })
            // piece.addEventListener("mousemove", (e) => {
            //     if (dragging) {
            //         console.log('mousemove')
            //         cursorPos.x = e.clientX
            //         cursorPos.y = e.clientY
            //         dx = cursorStartPos.x - cursorPos.x
            //         dy = cursorStartPos.y - cursorPos.y
            //         piece.style.top = `${top-dy}px`
            //         piece.style.left = `${left-dx}px`


            //     }
            // })

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
