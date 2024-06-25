
function deslectAll(cells) {
    cells.forEach(cell => {
        cell.div.classList.remove('selected');
    });
}

function addClickEvents(cells) {
    cells.forEach(cell => {
        cell.div.addEventListener('click', () => {    
            cell.div.classList.add('selected');
            let activeCells = cells.filter(cell => cell.div.classList.contains('selected'));
            if (activeCells.length > 1) {
                activeCells[0].swapImage(activeCells[1]);
                deslectAll(cells);
            }
        });
    })
}