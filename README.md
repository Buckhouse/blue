# James Buckhouse Portfolio Website

## Overview
This portfolio website showcases the creative works of James Buckhouse across art, design, film, and storytelling. It serves as an online hub to explore his projects, writings, and achievements in a clean, user-friendly interface.

## Table of Contents
- [Features](#features)
- [File Structure](#file-structure)
- [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)
- [Customization](#customization)
- [License](#license)

---

## Features
- **Responsive Design**: Adjusts seamlessly to different screen sizes for an optimal viewing experience.
- **Navigation Bar**: A reusable menu bar provides links to major sections: Art, Story, Design, Film, and About.
- **Dynamic Content**: Uses JSON to dynamically load images and descriptions.
- **Interactive Gallery**: Navigate through images with intuitive controls for an engaging user experience.
- **External Links**: Includes links to published articles, films, and other projects.

---

## File Structure

├── index.html          # Landing page
├── about.html          # About section with a detailed biography
├── art.html            # Gallery of art projects
├── story.html          # List of writings and stories
├── design.html         # Design work with embedded scripts
├── film.html           # Film-related projects
├── data.json           # JSON file storing image data
├── styles.css          # Styling for the entire website
├── scripts.js          # JavaScript for interactivity
├── images/             # Folder containing images used in the portfolio

---

## Technologies Used
- **HTML5**: Structure and layout of web pages.
- **CSS3**: Styling, including responsive design with `clamp()` and `ch` units.
- **JavaScript**: Interactivity, including navigation and data binding.
- **JSON**: Storing and retrieving image metadata.
- **External Scripts**: Integration with external tools like Delphi AI.

---

## How to Use

### Locally
1. Clone the repository:
   ```bash
   git clone <repository-url>
2.	Open index.html in your browser to view the portfolio.

### Hosting

	1.	Upload the files to a web server or use a platform like GitHub Pages.
	2.	Ensure the data.json and images folder paths are correctly linked.

### Update Content

	•	Images and Descriptions: Modify data.json to update images, titles, and descriptions dynamically.
	•	Menu Items: Adjust menu links in the <nav> section of each HTML file.	
	•   Edit scripts.js to add or modify interactivity.