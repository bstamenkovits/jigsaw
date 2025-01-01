const canvas = document.getElementById('puzzle');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Piece {
    constructor(x, y, width, height, correctX, correctY, rowIdx, colIdx) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.correctX = correctX;
        this.correctY = correctY;
        this.rowIdx = rowIdx
        this.colIdx = colIdx
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
}

class Board {
    constructor(resolution, ratio, canvasWidth, canvasHeight) {
        this.ratio = ratio // width/height
        this.resolution = resolution

        if (ratio>1) { //landscape
            // board rows and columns
            this.nRows = resolution
            this.nCols = Math.floor(resolution*ratio)

            // board dimensions
            this.width = 0.9*canvasWidth
            this.height = this.width/ratio

            // board top left corner
            this.xTopLeft = canvasWidth/2 - this.width/2
            this.yTopLeft = canvasHeight/2 - this.height/2

        } else { //portrait
            // board rows and columns
            this.nRows = Math.floor(resolution/ratio)
            this.nCols = resolution

            // board dimensions
            this.height = 0.9*canvasHeight
            this.width = this.height*ratio

            // board top left corner
            this.xTopLeft = canvasWidth/2 - this.width/2
            this.yTopLeft = canvasHeight/2 - this.height/2
        }
    }

    draw(ctx) {
        // Draw board background
        ctx.beginPath();
        ctx.fillStyle = "rgba(255, 255, 255, 0.02)";
        ctx.roundRect(this.xTopLeft, this.yTopLeft, this.width, this.height, 4);
        ctx.fill();

        // Draw grid
        ctx.lineWidth = "1";
        ctx.strokeStyle = "rgba(13, 13, 13, 0.4)";
        ctx.setLineDash([2, 4]);

        for (let i = 1; i < this.nRows; i++) {
            ctx.beginPath();
            ctx.moveTo(this.xTopLeft, this.yTopLeft + i*this.height/this.nRows);
            ctx.lineTo(this.xTopLeft + this.width, this.yTopLeft + i*this.height/this.nRows);
            ctx.stroke();
        }

        for (let i = 1; i < this.nCols; i++) {
            ctx.beginPath();
            ctx.moveTo(this.xTopLeft+ i*this.width/this.nCols, this.yTopLeft);
            ctx.lineTo(this.xTopLeft + i*this.width/this.nCols, this.yTopLeft + this.height);
            ctx.stroke();
        }
    }
}


class Puzzle {
    constructor(canvas, imageData, resolution) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ratio = imageData.width/imageData.height
        this.imageData = imageData
        this.board = new Board(
            resolution,
            this.ratio,
            canvas.width,
            canvas.height
        )

        this.mouseData = {
            xStart: null,
            yStart: null,
            xCurr: null,
            yCurr: null,
            mouseDown: false,
        }

        this.board.draw(this.ctx)

        this.pieces = this.createPieces()
        this.drawPieces()
        this.addEventListeners()
    }

    addEventListeners() {
        this.canvas.addEventListener('mousedown', (event) => {
            this.mouseData.xStart = event.clientX
            this.mouseData.yStart = event.clientY
            this.mouseData.mouseDown = true
            console.log('mousedown')
        })

        this.canvas.addEventListener('mousemove', (event) => {
            this.mouseData.xCurr = event.clientX
            this.mouseData.yCurr = event.clientY
            if (this.mouseData.mouseDown) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.board.draw(this.ctx)

                this.pieces[0].x = 100
                console.log('dragging')

                // draw pieces
                this.drawPieces()
            }
        })
    }

    createPieces() {
        let nRows = this.board.nRows
        let nCols = this.board.nCols

        let cellWidth = this.board.width/nCols
        let cellHeight = this.board.height/nRows

        let xStart = this.board.xTopLeft
        let yStart = this.board.yTopLeft

        let pieces = []
        for (let i = 0; i < nRows; i++) {
            // let row = []
            for (let j = 0; j < nCols; j++) {
                let x = xStart + j*cellWidth + cellWidth/2
                let y = yStart + i*cellHeight + cellHeight/2
                let piece = new Piece(x, y, cellWidth, cellHeight, x, y, i, j)
                pieces.push(piece)
            }
        }
        return pieces
    }

    drawPieces() {
        let image = new Image();
        image.src = `media/pictures/${this.imageData.name}`;
        image.onload = () => {
            this.pieces.forEach(piece => {
                piece.draw(this.ctx, image)
            });
        };
    }
}

function loadPuzzle(imageIdx, resolution) {
    fetch('images.json')
        .then(response => { return response.json(); })
        .then(data => {
            let imageData = data[imageIdx]
            let puzzle = new Puzzle(canvas, imageData, resolution)
        })
}

loadPuzzle(5, 4)
