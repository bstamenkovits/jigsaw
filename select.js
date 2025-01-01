const puzzleSelectContainer = document.getElementById('grid-container');


fetch('images.json')
    .then(response => { return response.json(); })
    .then(data => {
        for (const [idx, imageData] of Object.entries(data)) {
            // Process each key-value pair here
            // console.log(imageData);
            let thumbnail = createThumbNail(idx, imageData);
            puzzleSelectContainer.appendChild(thumbnail);
            // Example action: log each key-value pair
        }
    })


function createThumbNail(idx, imageData) {
    let thumbnail = document.createElement('a');
    thumbnail.href = `jigsaw.html?idx=${idx}`;
    thumbnail.href = `puzzle.html?idx=${idx}`;

    // let link = document.createElement('a');
    // link.href = 'google.com'
    // link.target = '_blank';

    let thumbnailSize = 110;
    thumbnail.className = 'thumbnail';
    thumbnail.style.backgroundImage = `url("media/thumbnail/${imageData.name}")`;
    thumbnail.style.backgroundSize = 'cover';
    thumbnail.style.backgroundPosition = 'center';
    // thumbnail.style.width = `${thumbnailSize}px`;
    // thumbnail.style.height = `${thumbnailSize}px`;
    // thumbnail.classList.add('hidden');

    // thumbnail.appendChild(link);
    thumbnail.addEventListener('click', () => {

    })
    return thumbnail;
}
