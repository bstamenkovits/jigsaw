function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Board {

    constructor(nRows, nCols, imageName) {
        this.nRows = nRows;
        this.nCols = nCols;
        this.imageName = imageName;

        // this.cellSize = (nRows> nCols) ? Math.floor(0.8*window.innerHeight/nRows) : Math.floor(0.8*window.innerWidth/nCols);
        this.cellSize = this.calculateCellSize();

        this.gridDiv = this.generateGridDiv();
        this.cells = this.generateCells();
        this.shuffleCells();
        this.addCellEventListeners();
    }

    calculateCellSize() {
        let maxWidth = 1*window.innerWidth;
        let maxHeight = 0.8*window.innerHeight;

        let cellMaxWidth = maxWidth/this.nCols;
        let cellMaxHeight = maxHeight/this.nRows;
        return Math.min(cellMaxWidth, cellMaxHeight);
    }

    generateGridDiv() {
        let gridContainer = document.getElementById('grid-container');
        gridContainer.style.gridTemplateRows = `repeat(${this.nRows}, 1fr)`;
        gridContainer.style.gridTemplateColumns = `repeat(${this.nCols}, 1fr)`;
        return gridContainer;
    }

    generateCells() {
        let cells = [];
        for (let y=0; y<this.nRows; y++) {
            for (let x=0; x<this.nCols; x++) {
                let fixed = (x === 0 | y === 0 | x === this.nCols-1 | y === this.nRows-1) ? true : false;
                let idx = y*this.nCols + x;
                let cell = new Cell(idx, x, y, x, y, fixed, this.cellSize, this.imageName, this.nRows, this.nCols);
                this.gridDiv.appendChild(cell.div);
                cells.push(cell);
            }
        }
        return cells;
    }

    deslectAllCells() {
        this.cells.forEach(cell => {
            cell.div.classList.remove('selected');
        });
    }

    shuffleCells() {
        for (let i=0; i<1000; i++) {
            let idx1 = Math.floor(Math.random()*this.cells.length);
            let idx2 = Math.floor(Math.random()*this.cells.length);
            this.cells[idx1].swapImage(this.cells[idx2]);
        }
    }

    checkBoard() {
        let correct = true;
        this.cells.forEach(cell => {
            if (!cell.checkPosition()) {
                correct = false;
            }
        })
        return correct;
    }

    addCellEventListeners() {
        this.cells.forEach(cell => {
            cell.div.addEventListener('click', () => {
                console.log("click")
            })
        })
    }

}
