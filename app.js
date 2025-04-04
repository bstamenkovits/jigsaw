// Assuming the URL is "index.html?id=123"
const urlParams = new URLSearchParams(window.location.search);
const imageIdx = urlParams.get('idx'); // "123"
const rangeInput = document.getElementById('slider-input');

loadPuzzle(imageIdx, 6);

class Piece {
    constructor(x, y, width, height, puzzleWidth, puzzleHeight, puzzleContainerDiv, isMovable=true, imageName=null) {
        this.left = x-width/2;
        this.top = y-height/2;
        this.width = width;
        this.height = height;
        this.imageName = imageName;
        this.div = this.createDiv(puzzleWidth, puzzleHeight, puzzleContainerDiv, isMovable);
        if (isMovable){
            this.addEventListeners();
        }
        this.active = false;
    }

    get x() { return this.left + this.width/2; }
    get y() { return this.top + this.height/2; }

    snapToPosition(x, y) {
        this.left = x - this.width/2;
        this.top = y - this.height/2;
        this.div.style.top = `${this.top}px`;
        this.div.style.left = `${this.left}px`;
    }

    createDiv(puzzleWidth, puzzleHeight, puzzleContainerDiv, isMovable=true) {
        let piece = document.createElement('div');
        puzzleContainerDiv.appendChild(piece);
        piece.className = 'piece';
        if (isMovable) {
            // console.log(this.imageName)
            let xOffSet = this.left - (puzzleContainerDiv.offsetWidth - puzzleWidth)/2;
            let yOffSet = this.top - (puzzleContainerDiv.offsetHeight - puzzleHeight)/2;
            console.log(xOffSet, yOffSet)
            console.log(this.left, this.top)
            piece.style.backgroundColor = 'red';
            piece.style.backgroundImage = `url("media/pictures/${this.imageName}")`;
            piece.style.backgroundSize = `${puzzleWidth}px ${puzzleHeight}px`;
            // piece.style.backgroundSize = `${90}px ${110}px`;
            piece.style.backgroundPosition = `-${xOffSet}px -${yOffSet}px`;
            // piece.style.backgroundPosition = `-${this.left}px -${this.top}px`;
        }
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
            // console.log('mousedown')
            this.dragging = true
            this.active = true
            this.div.style.zIndex = '10'
            this.div.style.outline = '2px solid white'
            this.cursorStartPos.x = e.clientX
            this.cursorStartPos.y = e.clientY
        });

        this.div.addEventListener("mousemove", (e) => {

            if (this.dragging&&this.active) {
                // console.log('mousemove', e.clientX, e.clientY)
                let dx = this.cursorStartPos.x - e.clientX
                let dy = this.cursorStartPos.y - e.clientY

                this.div.style.top = `${this.top-dy}px`
                this.div.style.left = `${this.left-dx}px`
            }
        });

        this.div.addEventListener("mouseup", (e) => {
            console.log('mouseup')
            this.dragging = false
            this.active = false
            this.div.style.outline = '0px solid white'
            this.div.style.zIndex = '1'
            this.top = parseFloat(this.div.style.top)
            this.left = parseFloat(this.div.style.left)
        });
    }
}

function createGrid(nRows, nCols, puzzleWidth, puzzleHeight, puzzleContainer, imageData) {
    let pieceWidth = puzzleWidth/nCols;
    let pieceHeight = puzzleHeight/nRows;

    let xStart = window.innerWidth/2 - puzzleWidth/2 + pieceWidth/2;
    let yStart = window.innerHeight/2 - puzzleHeight/2 + pieceHeight/2;

    let gridPositions = [];
    let pieces = [];

    // let piece = new Piece(xStart, yStart, pieceWidth, pieceHeight, puzzleWidth, puzzleHeight, puzzleContainer, isMovable=true, imageName=imageData.name);

    for (let i = 0; i < nRows; i++) {
        let y = yStart + i*pieceHeight;
        // console.log(y, yStart, i, pieceWidth)
        for (let j = 0; j < nCols; j++) {
            let x = xStart + j*pieceWidth;
            // console.log(x, xStart, j, pieceWidth)
            gridPositions.push({x: x, y: y});
        }
    }

    gridPositions.forEach((pos, idx) => {
        // console.log(pos.x, pos.y, pieceWidth, pieceHeight, puzzleWidth, puzzleHeight, puzzleContainer)
        let fixedPiece = new Piece(pos.x, pos.y, pieceWidth, pieceHeight, puzzleWidth, puzzleHeight, puzzleContainer, isMovable=false, imageName=null);
    });

    // console.log(imageData)
    gridPositions.forEach((pos, idx) => {
        let piece = new Piece(pos.x, pos.y, pieceWidth, pieceHeight, puzzleWidth, puzzleHeight, puzzleContainer, isMovable=true, imageName=imageData.name);
        pieces.push(piece);
    });
    let grid = {gridPositions: gridPositions, pieces: pieces};
    return grid
}



function loadPuzzle(imageIdx, resolution) {
    fetch('images.json')
        .then(response => { return response.json(); })
        .then(data => {
            let imageData = data[imageIdx]
            let ratio = imageData.width/imageData.height

            let nRows = (ratio > 1) ? parseFloat(resolution) : Math.floor(resolution/ratio)
            let nCols = (ratio < 1) ? parseFloat(resolution) : Math.floor(resolution*ratio)

            let puzzleContainer = document.getElementById('puzzle-container');

            // let puzzleWidth = 0.5*window.innerWidth
            // let puzzleHeight = puzzleWidth/ratio

            let puzzleHeight = 0.5*window.innerHeight
            let puzzleWidth = puzzleHeight*ratio

            // let piece = new Piece(300, 300, pieceWidth, pieceHeight, puzzleContainer);
            let grid = createGrid(
                nRows,
                nCols,
                puzzleWidth,
                puzzleHeight,
                puzzleContainer,
                imageData
            );

            console.log(grid.gridPositions)
            grid.pieces.forEach(piece => {
                piece.div.addEventListener('mouseup', (e) => {
                    let snapDistanceX = 0.5*piece.width/2
                    let snapDistanceY = 0.5*piece.height/2

                    console.log(piece.x, piece.y)
                    console.log(grid.gridPositions)


                    // console.log(dx, dy)
                    let snapPos = grid.gridPositions.find(pos => {
                        let dx = Math.abs(piece.x - pos.x)
                        let dy = Math.abs(piece.y - pos.y)

                        return dx < snapDistanceX && dy < snapDistanceY
                    })
                    console.log(snapPos, piece.x, piece.y)
                    if (snapPos) {
                        piece.snapToPosition(snapPos.x, snapPos.y);
                    }
                });

                let puzzleStartX = window.innerWidth/2 - puzzleWidth/2
                let puzzleStartY = window.innerHeight/2 - puzzleHeight/2

                let puzzleEndX = window.innerWidth/2 + puzzleWidth/2
                let puzzleEndY = window.innerHeight/2 + puzzleHeight/2

                randomX = window.innerWidth/2
                randomY = window.innerHeight/2

                while (randomX > puzzleStartX && randomX < puzzleEndX){
                    randomX = Math.random() * (window.innerWidth - piece.width)
                }
                while(randomY > puzzleStartY && randomY < puzzleEndY) {
                    randomY = Math.random() * (window.innerHeight - piece.height)
                }
                console.log(randomX, randomY)
                piece.snapToPosition(randomX, randomY);
            })
        })
}

// function closePopUp(popUpId) {
//     let popUp = document.getElementById(popUpId);
//     popUp.style.display = 'none';
//     popUp.style.zIndex = '-10';
// }

// function openPopUp(popUpId) {
//     let popUp = document.getElementById(popUpId);
//     popUp.style.display = 'flex';
//     popUp.style.zIndex = '10';
// }


// function updatePuzzle() {
//     // clear puzzle (remove all children of grid-container)
//     let gridContainer = document.getElementById('grid-container');
//     while (gridContainer.firstChild) {
//         gridContainer.removeChild(gridContainer.firstChild);
//     }

//     loadPuzzle(imageIdx, rangeInput.value);
//     closePopUp('settings');
// }
