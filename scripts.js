// scripts.js

// Global variables
let images = []; // Array to store images loaded from data.json
let currentIndex = 0; // Current image index

// Function to load images from data.json
function loadImages() {
  console.log('Attempting to load images...');
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok (${response.status})`);
      }
      return response.json();
    })
    .then(data => {
      images = data.images; // Assuming data.json has a structure like { "images": [ ... ] }
      console.log('Images successfully loaded:', images);
      initializePage();
    })
    .catch(error => {
      console.error('Error loading data.json:', error);
    });
}

// Function to get image index from URL parameter
function getImageIndexFromURL() {
  const params = new URLSearchParams(window.location.search);
  let imageURL = params.get('image');

  if (imageURL) {
    // Decode the URL
    imageURL = decodeURIComponent(imageURL);
    console.log('Image URL from parameter:', imageURL);

    // Find the index of the image in the images array
    const index = images.findIndex(image => image.imageURL === imageURL);
    console.log('Corresponding image index:', index);

    return index !== -1 ? index : 0; // Return 0 if image not found
  } else {
    console.log('No image parameter in URL. Defaulting to index 0.');
    return 0; // Default to first image
  }
}

// Function to update the displayed image and description
function updateImage(index) {
  console.log('Updating image at index:', index);
  const imageElement = document.getElementById('image');
  const descriptionElement = document.getElementById('description');

  if (!images || images.length === 0) {
    console.error('Images array is empty or not defined.');
    return;
  }

  const newImage = images[index];

  if (!newImage) {
    console.error('No image found at index:', index);
    return;
  }

  console.log('New image data:', newImage);

  // Update image and description
  imageElement.src = newImage.imageURL;
  imageElement.alt = newImage.title || 'Artwork'; // Use title as alt text
  descriptionElement.textContent = newImage.description || '';

  // Update URL without reloading the page
  const newUrl = `art.html?image=${encodeURIComponent(newImage.imageURL)}`;
  window.history.pushState({ path: newUrl }, '', newUrl);

  console.log('URL updated to:', newUrl);

  // Adjust layout after updating content
  adjustLayout();
}

// Function to open the gallery overlay
function openGalleryOverlay() {
  const galleryOverlay = document.getElementById('galleryOverlay');
  galleryOverlay.style.display = 'flex'; // Show the overlay
}

// Function to close the gallery overlay
function closeGalleryOverlay() {
  const galleryOverlay = document.getElementById('galleryOverlay');
  galleryOverlay.style.display = 'none'; // Hide the overlay
}

// Function to initialize the gallery overlay
function initGalleryOverlay() {
  const galleryGrid = document.getElementById('galleryGrid');
  const closeGalleryButton = document.getElementById('closeGalleryButton');

  if (!galleryGrid || !closeGalleryButton) {
    console.error('Gallery overlay elements not found in DOM');
    return;
  }

  // Populate the gallery grid with thumbnails
  images.forEach((image, index) => {
    const imgElement = document.createElement('img');

    // Generate the thumbnail URL by inserting '_thumb' before the file extension
    const thumbnailURL = image.imageURL.replace(/(\.[\w\d_-]+)$/i, '_thumb$1');

    imgElement.src = thumbnailURL;
    imgElement.alt = image.title || 'Artwork';
    imgElement.dataset.index = index; // Store the index for reference
    imgElement.addEventListener('click', () => {
      console.log('Thumbnail clicked, index:', index);
      currentIndex = index;
      updateImage(currentIndex);
      closeGalleryOverlay();
    });
    galleryGrid.appendChild(imgElement);
  });

  // Close button click handler
  closeGalleryButton.addEventListener('click', () => {
    console.log('Close gallery button clicked');
    closeGalleryOverlay();
  });

  // Also close the overlay when clicking outside the content area
  const galleryOverlay = document.getElementById('galleryOverlay');
  galleryOverlay.addEventListener('click', (event) => {
    if (event.target === galleryOverlay) {
      closeGalleryOverlay();
    }
  });
}

// Function to initialize the page
function initializePage() {
  console.log('Initializing page...');
  currentIndex = getImageIndexFromURL();
  updateImage(currentIndex);

  // Event listeners for navigation buttons
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  const galleryButton = document.getElementById('galleryButton');

  if (!leftArrow || !rightArrow || !galleryButton) {
    console.error('Navigation elements not found in DOM');
    return;
  }

  // Left button click handler
  leftArrow.addEventListener('click', () => {
    console.log('Left arrow clicked');
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage(currentIndex);
  });

  // Right button click handler
  rightArrow.addEventListener('click', () => {
    console.log('Right arrow clicked');
    currentIndex = (currentIndex + 1) % images.length;
    updateImage(currentIndex);
  });

  // Gallery button click handler
  galleryButton.addEventListener('click', () => {
    console.log('Gallery button clicked');
    openGalleryOverlay();
  });

  // Initialize gallery overlay
  initGalleryOverlay();
}

// Function to adjust layout based on viewport and content sizes
function adjustLayout() {
  // Get viewport height
  const viewportHeight = window.innerHeight;

  // Get the optical center offset percentage from CSS variable
  const opticalCenterOffsetPercentage = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--optical-center-offset'));

  // Calculate optical center offset in pixels
  const opticalCenterOffset = viewportHeight * (opticalCenterOffsetPercentage / 100);

  // Calculate available height for content
  const availableHeight = viewportHeight - opticalCenterOffset;

  // Get elements
  const image = document.getElementById('image');
  const description = document.getElementById('description');
  const controls = document.querySelector('.controls');

  // Get actual heights of description and controls
  const descriptionHeight = description.offsetHeight;
  const controlsHeight = controls.offsetHeight;

  // Define margins and paddings (adjust as needed)
  const margins = 40; // Total vertical margins/padding in pixels

  // Calculate available height for image
  const availableImageHeight = availableHeight - descriptionHeight - controlsHeight - margins;

  // Set max-height of the image
  image.style.maxHeight = availableImageHeight + 'px';
  image.style.width = 'auto';
  image.style.height = 'auto';

  // Log calculations (for debugging)
  console.log('Viewport Height:', viewportHeight);
  console.log('Optical Center Offset:', opticalCenterOffset);
  console.log('Available Height:', availableHeight);
  console.log('Description Height:', descriptionHeight);
  console.log('Controls Height:', controlsHeight);
  console.log('Available Image Height:', availableImageHeight);
}

// On DOMContentLoaded, start loading images
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded event fired');
  loadImages();

  // Adjust layout after initial load
  adjustLayout();
});

// Handle browser's back/forward navigation
window.addEventListener('popstate', (event) => {
  console.log('popstate event fired');
  currentIndex = getImageIndexFromURL();
  updateImage(currentIndex);
});

// Adjust layout on window resize
window.addEventListener('resize', adjustLayout);

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
  
  // Image Swap Functionality
  const imageSwaps = {
    image1: { hover: './images/story_out.png', default: './images/story_in.png' },
    image2: { hover: './images/art_out.png', default: './images/art_in.png' },
    image3: { hover: './images/design_out.png', default: './images/design_in.png' },
    image4: { hover: './images/film_out.png', default: './images/film_in.png' },
    image5: { hover: './images/buckhouse_out.png', default: './images/buckhouse_in.png' },
  };

  for (const [id, paths] of Object.entries(imageSwaps)) {
    const imgElement = document.getElementById(id);
    if (!imgElement) {
      console.warn(`Image with ID '${id}' not found`);
      continue;
    }

    // Add hover effect to swap images
    imgElement.addEventListener('mouseover', () => {
      imgElement.src = paths.hover;
    });

    imgElement.addEventListener('mouseout', () => {
      imgElement.src = paths.default;
    });
  }

  // Keyboard Shortcuts for Navigation
  const shortcuts = {
    KeyA: 'art.html',
    KeyS: 'story.html',
    KeyD: 'design.html',
    KeyF: 'film.html',
    KeyG: 'about.html',
  };

  document.addEventListener('keydown', (event) => {
    const page = shortcuts[event.code];
    if (page) {
      console.log(`Navigating to ${page}`);
      window.location.href = page;
    }
  });
});