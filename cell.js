class Cell {
    constructor(idx, x, y, x0, y0, div, fixed=false) {
        this.idx = idx;
        this.x = x; // current x position
        this.y = y; // current y position
        this.x0 = x0; // correct x position
        this.y0 = y0; // correct y position
        this.div = div;
        this.fixed = fixed;
        
        // this.div = this.createCellDiv(size, idx)
    }

    updatePosition(x, y) {
        this.x = x;
        this.y = y;
    
        let rect = this.div.getBoundingClientRect();
        this.div.style.backgroundPositionX = `-${x * rect.width}px`;
        this.div.style.backgroundPositionY = `-${y * rect.height}px`;
    }

    swapImage(cell) {
        if ( cell.fixed | this.fixed ) { return }
        let otherX = cell.x;
        let otherY = cell.y;
        cell.updatePosition(this.x, this.y);
        this.updatePosition(otherX, otherY);
    }
}