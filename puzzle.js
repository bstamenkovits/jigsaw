const canvas = document.getElementById('puzzle');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

// class Grid {
//     constructor(board) {
//         this.board = board
//         this.positions = this.createGrid();
//         console.log(this.positions[0][1])
//     }

//     createGrid() {
//         let nRows = this.board.nRows
//         let nCols = this.board.nCols

//         let xStart = this.board.x
//         let yStart = this.board.y

//         let positions = []
//         for (let i = 0; i < nRows; i++) {
//             let row = []
//             for (let j = 0; j < nCols; j++) {
//                 let x = xStart + j*
//                 let y = yStart
//                 let canvasPosition = [x, y]
//                 this.drawCircle(this.board.ctx, x, y)

//                 row.push(canvasPosition)
//             }
//             positions.push(row)
//         }
//         return positions
//     }

//     drawCircle(ctx, x, y) {
//         ctx.beginPath();
//         ctx.arc(x, y, 4, 0, 2 * Math.PI);
//         ctx.fillStyle = "red";
//         ctx.fill();
//     }
// }

// Blue rectangle
class Board {
    constructor(canvas, imageData, resolution) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ratio = imageData.width/imageData.height
        this.nRows = (this.ratio > 1) ? resolution : Math.floor(resolution/this.ratio)
        this.nCols = (this.ratio < 1) ? resolution : Math.floor(resolution*this.ratio)

        if (this.ratio>1) {
            // board dimensions
            this.boardWidth = 0.9*canvas.width
            this.boardHeight = this.boardWidth/this.ratio
            // board top left corner
            this.x = canvas.width/2 - this.boardWidth/2
            this.y = canvas.height/2 - this.boardHeight/2

        } else {
            // board dimensions
            this.boardHeight = 0.9*canvas.height
            this.boardWidth = this.boardHeight*this.ratio
            // board top left corner
            this.x = canvas.width/2 - this.boardWidth/2
            this.y = canvas.height/2 - this.boardHeight/2
        }

        this.drawBackground(this.ctx)
        this.positions = this.createGrid()
        this.pieces = this.createPieces()
        // this.drawPieces(this.ctx)
    }

    createGrid() {
        let nRows = this.nRows
        let nCols = this.nCols

        let cellWidth = this.boardWidth/nCols
        let cellHeight = this.boardHeight/nRows

        let xStart = this.x
        let yStart = this.y
        console.log(xStart)

        let positions = []
        for (let i = 0; i < nRows; i++) {
            let row = []
            for (let j = 0; j < nCols; j++) {
                let x = xStart + j*cellWidth + cellWidth/2
                let y = yStart + i*cellHeight + cellHeight/2
                let canvasPosition = [x, y]
                this.drawCircle(this.ctx, x, y)
                row.push(canvasPosition)
            }
            positions.push(row)
        }
        return positions
    }

    createPieces() {
        let pieces = []
        this.positions.forEach(row => {
            row.forEach(pos => {
                let piece = new Piece(
                    pos[0],
                    pos[1],
                    this.boardWidth/this.nCols,
                    this.boardHeight/this.nRows,
                    pos[0],
                    pos[1],
                    this.positions.indexOf(row),
                    row.indexOf(pos)
                )
                pieces.push(piece)
            });
        });
        return pieces
    }

    drawPieces(ctx, image) {
        this.pieces.forEach(piece => {
            piece.draw(ctx, image)
        });
    }

    drawCircle(ctx, x, y) {
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    drawBackground() {
        // Draw board background
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        ctx.roundRect(this.x, this.y, this.boardWidth, this.boardHeight, 4);
        ctx.fill();

        ctx.lineWidth = "1";
        ctx.strokeStyle = "rgba(13, 13, 13, 0.4)";
        ctx.setLineDash([2, 4]);
        for (let i = 1; i < this.nRows; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y + i*this.boardHeight/this.nRows);
            ctx.lineTo(this.x + this.boardWidth, this.y + i*this.boardHeight/this.nRows);
            ctx.stroke();
        }

        for (let i = 1; i < this.nCols; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x+ i*this.boardWidth/this.nCols, this.y);
            ctx.lineTo(this.x + i*this.boardWidth/this.nCols, this.y + this.boardHeight);
            ctx.stroke();
        }
    }
}

class Piece {
    constructor(x, y, width, height, trueX, trueY, rowIdx, colIdx) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.trueX = trueX
        this.trueY = trueY
        this.rowIdx = rowIdx
        this.colIdx = colIdx
        // this.addEventListeners()
    }

    draw(ctx, image) {
        ctx.drawImage(
            image,
            // top left source image position
            image.width/4*this.colIdx,
            image.height/6*this.rowIdx,

            // width and height of source
            image.width/4,
            image.height/6,

            // top left canvas position
            this.x-this.width/2,
            this.y-this.height/2,

            // width and height of canvas render
            this.width,
            this.height,
        )
    }

    highlight() {
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
        ctx.roundRect(this.x-this.width/2, this.y-this.height/2, this.width, this.height, 4);
        ctx.fill();
    }
}



function loadPuzzle(imageIdx, resolution) {
    fetch('images.json')
        .then(response => { return response.json(); })
        .then(data => {
            let imageData = data[imageIdx]
            let board = new Board(canvas, imageData, resolution)
            let ctx = canvas.getContext('2d')
            let image = new Image();
            image.src = `media/pictures/${imageData.name}`;

            // let grid = new Grid(board)

            // let piece = new Piece(window.innerWidth/2, window.innerHeight/2, board.boardWidth/board.nCols, board.boardHeight/board.nRows)
            image.onload = () => {
                board.drawPieces(ctx, image)
            };

            const mousedown = false;
            let activePiece = null;
            let startPos = null;
            canvas.addEventListener('mousedown', (e) => {
                let rect = canvas.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;
                startPos = [x, y]

                board.pieces.forEach(piece => {
                    if (x > piece.x-piece.width/2 && x < piece.x+piece.width/2 && y > piece.y-piece.height/2 && y < piece.y+piece.height/2) {
                        activePiece = piece;
                    }
                })

                activePiece.highlight()

                // find piece being clicked, set it to active
            })

            canvas.addEventListener('mouseup', (e) => {
                // if active piece, check if it's in the right position
                // if it is, snap it to the right position

                // reset
                mousedown = false;
                activePiece = null;
                startPos = null;
            })

            let currentPos = null;
            canvas.addEventListener('mousemove', (e) => {
                if (mousedown) {
                    console.log('dragging')
                    let rect = canvas.getBoundingClientRect();
                    let x = e.clientX - rect.left;
                    let y = e.clientY - rect.top;
                    dx = x - startPos[0]
                    dy = y - startPos[1]
                    startPos = [x, y]
                }
            })


            // let board = new Board(nRows, nCols, imageData.name)
        })
}

loadPuzzle(5, 4)
