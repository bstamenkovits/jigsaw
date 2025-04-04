export class Cell {
    constructor(idx, x, y, x0, y0, fixed, size, imageName, nRows, nCols) {
        this.idx = idx;
        this.x = x; // current x position
        this.y = y; // current y position
        this.x0 = x0; // correct x position
        this.y0 = y0; // correct y position
        this.fixed = fixed;
        this.size = size;
        this.imageName = imageName;
        this.div = this.createCellDiv(nRows, nCols)

    }

    createCellDiv(nRows, nCols) {
        let cellDiv = document.createElement('div');
        cellDiv.className = 'cell';
        // cellDiv.textContent = text;
        cellDiv.style.width = `${this.size}px`;
        cellDiv.style.height = `${this.size}px`;

        cellDiv.style.backgroundImage = `url("media/pictures/${this.imageName}")`;
        cellDiv.style.backgroundSize = `${nCols*this.size}px ${nRows*this.size}px`;
        cellDiv.style.backgroundPositionX = `-${this.x * this.size}px`;
        cellDiv.style.backgroundPositionY = `-${this.y * this.size}px`;
        return cellDiv
    }

    updatePosition(xNew, yNew) {
        this.x = xNew;
        this.y = yNew;

        let rect = this.div.getBoundingClientRect();
        this.div.style.backgroundPositionX = `-${xNew * rect.width}px`;
        this.div.style.backgroundPositionY = `-${yNew * rect.height}px`;
    }

    swapImage(cell) {
        if ( cell.fixed | this.fixed ) { return }
        let otherX = cell.x;
        let otherY = cell.y;
        cell.updatePosition(this.x, this.y);
        this.updatePosition(otherX, otherY);
    }

    checkPosition() {
        return (this.x === this.x0 && this.y === this.y0)
    }
}
