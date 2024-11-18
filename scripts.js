// Functionality for loading dynamic image data (unrelated to hover effect)
let currentIndex = 0;
let imagesData = [];

async function fetchData() {
  try {
    const response = await fetch('data.json');
    imagesData = (await response.json()).images;
    updateDisplay();
  } catch (error) {
    console.error("Error fetching image data:", error);
  }
}

function updateDisplay() {
  if (imagesData.length > 0) {
    const imageData = imagesData[currentIndex];
    const imageElement = document.getElementById('image');
    if (imageElement) {
      imageElement.src = imageData.imageURL;
      imageElement.alt = imageData.description;
      document.getElementById('description').textContent = imageData.description;
    }
  }
}

document.querySelector('.left')?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
  updateDisplay();
});

document.querySelector('.right')?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imagesData.length;
  updateDisplay();
});

// Fetch data when DOM is ready
fetchData();

// Hover functionality for index images
document.addEventListener("DOMContentLoaded", () => {
  const images = [
    { id: 'image1', inSrc: './images/story_in.png', outSrc: './images/story_out.png' },
    { id: 'image2', inSrc: './images/art_in.png', outSrc: './images/art_out.png' },
    { id: 'image3', inSrc: './images/design_in.png', outSrc: './images/design_out.png' },
    { id: 'image4', inSrc: './images/film_in.png', outSrc: './images/film_out.png' },
    { id: 'image5', inSrc: './images/buckhouse_in.png', outSrc: './images/buckhouse_out.png' }
  ];

  images.forEach(image => {
    const imgElement = document.getElementById(image.id);

    if (imgElement) {
      // Change to "out" version on mouseover
      imgElement.addEventListener('mouseover', () => {
        imgElement.src = image.outSrc;
      });

      // Revert to "in" version on mouseout
      imgElement.addEventListener('mouseout', () => {
        imgElement.src = image.inSrc;
      });
    } else {
      console.warn(`Image with ID ${image.id} not found.`);
    }
  });
});

document.addEventListener("keydown", (event) => {
    switch (event.key.toLowerCase()) {
        case 'a':
            window.location.href = 'art.html';
            break;
        case 's':
            window.location.href = 'story.html';
            break;
        case 'd':
            window.location.href = 'design.html';
            break;
        case 'f':
            window.location.href = 'film.html';
            break;
        default:
            break;
    }
});