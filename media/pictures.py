import os 
from PIL import Image
import json
# rename
# for i, filename in enumerate(os.listdir('media/pictures')):
#     print(i, filename)
#     old_path = f'media/pictures/{filename}' 
#     new_path = f'media/pictures/image{i}.jpg'
#     os.rename(old_path, new_path)

image_data = {}
for filename in os.listdir('media/pictures'):
    path = f'media/pictures/{filename}'
    idx = filename.split('.')[0][5:]
    image = Image.open(path)
    width, height = image.size
    
    min_size = 300
    
    w = min_size if width<height else int(min_size * width / height)
    h = min_size if height<width else int(min_size * height / width)
    
    image = image.resize((w, h))
    image.save(f'media/thumbnail/{filename}')
    print(width, height)
    print(w, h)
    print()
    
    # if width > height:
    #     width = max_size
    #     height = int(max_size * image.size[1] / image.size[0])
    # else:
    #     height = max_size
    #     width = int(max_size * image.size[0] / image.size[1])
    #     image = image.resize((width, height))
    #     image.save(path)
    
    # data = {
    #     "name": filename,
    #     "width": width,
    #     "height": height,
    # }
    # image_data[idx] = data
    
    

# with open('image_data.json', 'w') as json_file:
#     json.dump(image_data, json_file, indent=4)

print()