// Assuming the JSON file is named `data.json` and located in the same directory as your HTML file
const image_idx = 1;
const resolution = 6;

fetch('images.json')
    .then(response => { return response.json(); })
    .then(data => {
        let imageData = data[image_idx]
        let ratio = imageData.width/imageData.height

        let nRows = (ratio > 1) ? resolution : Math.floor(resolution/ratio)
        let nCols = (ratio < 1) ? resolution : Math.floor(resolution*ratio)
        
        console.log(nRows, nCols)
        generateBoard(nRows, nCols)

    })