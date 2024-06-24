document.addEventListener("DOMContentLoaded", function() {
    const nRows = 8; // Number of rows
    const nCols = 5; // Number of columns

    console.log(window.innerWidth, window.innerHeight)
    size = (nRows> nCols) ? Math.floor(0.8*window.innerHeight/nRows) : Math.floor(0.8*window.innerWidth/nCols);
    console.log(size)

    // image should always take up ~80% of the screen
    // size = (nRows> nCols) ? `${Math.floor(80/nRows)}vh` : `${Math.floor(80/nCols)}vw`;
    const gridContainer = document.getElementById('grid-container');

    // Set the grid template rows and columns based on n and m
    gridContainer.style.gridTemplateRows = `repeat(${nRows}, 1fr)`;
    gridContainer.style.gridTemplateColumns = `repeat(${nCols}, 1fr)`;

    let cells = [];
    // Generate the grid items
    for (let y=0; y<nRows; y++) {
        for (let x=0; x<nCols; x++) {
            
            let idx = y*nCols + x;
            console.log(x, y, idx)
            let cellDiv = createCellDiv(size, idx, nRows, nCols, x, y);
            let cell = new Cell(x, y, x, y, cellDiv);
            gridContainer.appendChild(cellDiv);
            cells.push(cell);
        }
    }

    let cell = cells[12];
    cell.updatePosition(2, 2);
});






function createCellDiv(size, text, nRows, nCols, x, y) {
    let cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.textContent = text; 
    cellDiv.style.width = `${size}px`;
    cellDiv.style.height = `${size}px`;
    
    cellDiv.style.backgroundImage = 'url("image.jpg")';
    cellDiv.style.backgroundSize = `${nCols*size}px ${nRows*size}px`;
    cellDiv.style.backgroundPositionX = `-${x * size}px`;
    cellDiv.style.backgroundPositionY = `-${y * size}px`;
    return cellDiv
}