const puzzleSelectContainer = document.getElementById('grid-container');


fetch('media/images.json')
    .then(response => { return response.json(); })
    .then(data => {
        for (const [idx, imageData] of Object.entries(data)) {
            const windowHeight = window.innerHeight;
            const windowWidth = window.innerWidth;
            console.log(windowHeight, windowWidth);
            console.log(windowHeight>windowWidth);
            let orientation = (windowHeight > windowWidth) ? "portrait" : "landscape";
            console.log(orientation);
            // Process each key-value pair here
            // console.log(imageData);
            if (imageData.type == orientation) {
                let thumbnail = createThumbNail(idx, imageData);
                puzzleSelectContainer.appendChild(thumbnail);
            }
            // Example action: log each key-value pair
        }

        // Randomize the order of puzzleSelectContainer children
        const children = Array.from(puzzleSelectContainer.children);
        children.sort(() => Math.random() - 0.5);
        puzzleSelectContainer.innerHTML = '';
        children.forEach(child => puzzleSelectContainer.appendChild(child));
    })


function createThumbNail(idx, imageData) {
    let thumbnail = document.createElement('a');
    thumbnail.href = `jigsaw.html?idx=${idx}`;

    // let link = document.createElement('a');
    // link.href = 'google.com'
    // link.target = '_blank';

    let thumbnailSize = 110;
    thumbnail.className = 'thumbnail';
    thumbnail.style.backgroundImage = `url("media/thumbnails/${imageData.name}")`;
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
