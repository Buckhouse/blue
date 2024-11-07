let currentIndex = 0;
let imagesData = [];

async function fetchData() {
  const response = await fetch('data.json');
  imagesData = (await response.json()).images;
  updateDisplay(); // Dynamically load the first image after fetching data
}

function updateDisplay() {
    const imageData = imagesData[currentIndex];
    document.getElementById('image').src = imageData.imageURL;
    document.getElementById('image').alt = imageData.description;
    document.getElementById('description').textContent = imageData.description;
    // document.getElementById('pagination').textContent = `${currentIndex + 1} / ${imagesData.length}`; // Update pagination
  }

document.querySelector('.left').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + imagesData.length) % imagesData.length;
  updateDisplay();
});

document.querySelector('.right').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % imagesData.length;
  updateDisplay();
});

// Initialize data fetching and load the first image dynamically
fetchData();


