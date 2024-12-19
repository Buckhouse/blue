from PIL import Image
import os

# Directory containing images
directory = './images'
thumbnail_size = 150  # Desired thumbnail size (150x150 pixels)

def create_thumbnail(file_path):
    try:
        # Open the image
        img = Image.open(file_path)

        # Create a square crop, maintaining the center
        width, height = img.size
        crop_size = min(width, height)  # Crop to the smaller dimension
        left = (width - crop_size) // 2
        top = (height - crop_size) // 2
        right = left + crop_size
        bottom = top + crop_size
        img = img.crop((left, top, right, bottom))

        # Resize to the thumbnail size
        img = img.resize((thumbnail_size, thumbnail_size), Image.LANCZOS)

        # Save the thumbnail with _thumb appended before the extension
        base_name, ext = os.path.splitext(file_path)
        thumbnail_path = f"{base_name}_thumb{ext}"
        img.save(thumbnail_path)

        print(f"Thumbnail created: {thumbnail_path}")
    except Exception as e:
        print(f"Failed to process {file_path}: {e}")

# Process all images in the directory
for filename in os.listdir(directory):
    if '_thumb' in filename:  # Skip files that already have '_thumb' in their name
        print(f"Skipping thumbnail: {filename}")
        continue

    file_path = os.path.join(directory, filename)
    if os.path.isfile(file_path) and file_path.endswith(('.jpg', '.jpeg', '.png')):
        create_thumbnail(file_path)

print('Thumbnail creation completed.')