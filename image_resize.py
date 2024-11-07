from PIL import Image
import os
import math

# Set your directory path here
directory = './images'
max_size = 1 * 1024 * 1024  # 1 MB in bytes

def resize_image(file_path):
    file_size = os.path.getsize(file_path)
    
    # Skip resizing if the image is already under 1 MB
    if file_size <= max_size:
        print(f"Skipping {file_path} as it's already under 1 MB.")
        return

    img = Image.open(file_path)
    
    # Calculate scaling factor based on current size to reach target
    scale_factor = math.sqrt(max_size / file_size)
    
    # Calculate new dimensions, maintaining aspect ratio
    new_width = int(img.size[0] * scale_factor)
    new_height = int(img.size[1] * scale_factor)
    
    # Resize and save the image
    img = img.resize((new_width, new_height), Image.LANCZOS)
    img.save(file_path)
    
    # Further reduce quality if still over limit
    quality = 95
    while os.path.getsize(file_path) > max_size and quality > 10:
        img.save(file_path, quality=quality)
        quality -= 5

for filename in os.listdir(directory):
    file_path = os.path.join(directory, filename)
    if os.path.isfile(file_path) and file_path.endswith(('.jpg', '.jpeg', '.png')):
        if os.path.getsize(file_path) > max_size:
            print(f'Resizing {filename}...')
            resize_image(file_path)
        else:
            print(f'{filename} is already under 1 MB.')

print('Image resizing completed.')