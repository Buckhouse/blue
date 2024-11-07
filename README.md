Portfolio Image Viewer

This is a simple web-based portfolio viewer that displays a series of images with accompanying descriptions and dates. Users can navigate through the images using left and right arrow buttons.

Features

	•	Image Navigation: Allows users to click between images using left and right arrow buttons.
	•	Date and Description Display: Each image is accompanied by a date and description, providing context for each piece of artwork.
	•	Responsive Layout: The design centers content, and flexbox is used to ensure a clean layout across devices.
	•	Customizable Styles: Uses CSS variables for easy customization of colors, fonts, and other styling details.
	•	Interactive Controls: The left and right arrow buttons shrink slightly on click to give a tactile response.

Files

	•	index.html: The main HTML file that sets up the structure of the viewer and includes references to CSS and JavaScript files.
	•	styles.css: Contains all the styling for the viewer, including layout, colors, and effects for interactive elements.
	•	scripts.js: Handles image data loading and updates the displayed content when navigation buttons are clicked.
	•	data.json: A JSON file with an array of images, each with a date, description, and image URL, used to dynamically populate the content.


How It Works

	1.	Data Fetching: The scripts.js file fetches image data from the locally stored data.json.
	2.	Dynamic Content Update: The current image, date, and description are updated based on the currentIndex value.
	3.	Navigation: The left and right buttons change the currentIndex, cycling through the available images.

Customization

	•	Styling: Modify styles.css to change the look and feel of the portfolio viewer. Adjust the CSS variables defined in :root to quickly change colors and fonts.
	•	Image and Text Data: Update data.json to add or modify images, dates, and descriptions.
	•	Image Controls: The controls use left.jpg and right.jpg images as navigation buttons. Customize these images to change the look of the navigation.

Known Issues

	•	Description Overflow: The description area is constrained with a max height to prevent overflow. If descriptions are too long, they will scroll within the container.

Future Improvements

	•	Add Pagination: Display the current image number out of the total.
	•	Improved Responsiveness: Add more breakpoints for different screen sizes.