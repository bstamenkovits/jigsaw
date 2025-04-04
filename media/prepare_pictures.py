import os
from PIL import Image
import json
import uuid

image_data = {}

for filename in os.listdir('thumbnails'):
    # delete old thumbnails
    os.remove(f'thumbnails/{filename}')

for filename in os.listdir('pictures'):
    random_name_map = {}
    random_name = f"{uuid.uuid4().hex}.jpg"
    random_name_map[filename] = random_name
    os.rename(f'pictures/{filename}', f'pictures/{random_name}')

for id, filename in enumerate(os.listdir('pictures')):
    # rename file
    old_path = f'pictures/{filename}'
    new_path = f'pictures/image{id}.jpg'
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
    image.save(f'thumbnails/image{id}.jpg')

    # store image data in dictionary
    data = {
        "name": f"image{id}.jpg",
        "width": width,
        "height": height,
        "type": "landscape" if width > height else "portrait",
    }
    image_data[id] = data

# save image data to JSON file
with open('images.json', 'w') as json_file:
    json.dump(image_data, json_file, indent=4)
