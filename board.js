// const nRows = 6; // Number of rows
// const nCols = 4; // Number of columns

function generateBoard(nRows, nCols) {
    const gridContainer = document.getElementById('grid-container');

    // Set the grid template rows and columns based on n and m
    gridContainer.style.gridTemplateRows = `repeat(${nRows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${nCols}, 1fr)`;

    size = (nRows> nCols) ? Math.floor(0.8*window.innerHeight/nRows) : Math.floor(0.8*window.innerWidth/nCols);
    let cells = generateCells(size, nRows, nCols, gridContainer);
    console.log(cells)
    shuffleCells(cells);
    addClickEvents(cells);
}


function generateCells(size, nRows, nCols, gridContainer) {
    console.log(size, nRows, nCols)
    let cells = [];
    for (let y=0; y<nRows; y++) {
        for (let x=0; x<nCols; x++) {
            let fixed = (x === 0 | y === 0 | x === nCols-1 | y === nRows-1) ? true : false;
            let idx = y*nCols + x;
            let cellDiv = createCellDiv(size, idx, nRows, nCols, x, y);
            let cell = new Cell(idx, x, y, x, y, cellDiv, fixed);
            gridContainer.appendChild(cellDiv);
            cells.push(cell);
        }
    }
    return cells;
}


function shuffleCells(cells) {
    for (let i=0; i<1000; i++) {
        let idx1 = Math.floor(Math.random()*cells.length);
        let idx2 = Math.floor(Math.random()*cells.length);
        cells[idx1].swapImage(cells[idx2]);
    }
}

// let cell1= cells[12];
// let cell2 = cells[13];
// cell1.swapImage(cell2);




function createCellDiv(size, text, nRows, nCols, x, y) {
    let cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    // cellDiv.textContent = text; 
    cellDiv.style.width = `${size}px`;
    cellDiv.style.height = `${size}px`;
    
    cellDiv.style.backgroundImage = 'url("image1.jpg")';
    cellDiv.style.backgroundSize = `${nCols*size}px ${nRows*size}px`;
    cellDiv.style.backgroundPositionX = `-${x * size}px`;
    cellDiv.style.backgroundPositionY = `-${y * size}px`;
    return cellDiv
}