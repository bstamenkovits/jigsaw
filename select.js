const puzzleSelectContainer = document.getElementById('puzzle-select-container');

fetch('images.json')
    .then(response => { return response.json(); })
    .then(data => {
        for (const [idx, imageData] of Object.entries(data)) {
            // Process each key-value pair here
            console.log(imageData); 
            let thumbnail = createThumbNail(idx, imageData);
            puzzleSelectContainer.appendChild(thumbnail);
            // Example action: log each key-value pair
        }
    })


function createThumbNail(idx, imageData) {
    let thumbnail = document.createElement('div');
    thumbnail.className = 'thumbnail';
    thumbnail.style.backgroundImage = `url("media/thumbnail/${imageData.name}")`;
    thumbnail.style.backgroundSize = 'cover';
    thumbnail.style.backgroundPosition = 'center';
    thumbnail.style.width = '100px';
    thumbnail.style.height = '100px';
    thumbnail.classList.add('hidden');

    thumbnail.addEventListener('click', () => {

    })
    return thumbnail;
}