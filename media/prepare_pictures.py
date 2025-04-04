import os
from PIL import Image
import json

image_data = {}
for i, filename in enumerate(os.listdir('pictures')):
    print(i, filename)

    # rename file
    old_path = f'pictures/{filename}'
    new_path = f'pictures/image{i}.jpg'
    os.rename(old_path, new_path)

    # get image dimensions
    image = Image.open(new_path)
    width, height = image.size

    # determine new image dimensions such that its smallest side is 300px
    min_size = 300
    w = min_size if width<height else int(min_size * width / height)
    h = min_size if height<width else int(min_size * height / width)

    # resize image and save it to thumbnail directory
    image = image.resize((w, h))
    image.save(f'thumbnails/{filename}')

    # store image data in dictionary
    data = {
        "name": f"image{i}.jpg",
        "width": width,
        "height": height,
    }
    image_data[i] = data

# save image data to JSON file
with open('images.json', 'w') as json_file:
    json.dump(image_data, json_file, indent=4)
